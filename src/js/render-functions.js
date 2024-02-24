'use strict';

const gallery = document.querySelector('.gallery');

export function templateImage(image) {
  return `<li class="gallery-card">
  <div class="gallery-card-wrapper">
    <div class="thumb">
      <a href="${image.largeImageURL}" class="gallery-link-image"><img class="gallery-img" src="${image.webformatURL}" data-original-size="${image.largeImageURL}" alt="${image.tags}" /></a>
    </div>
    <ul class="statistic-list">
      <li class="statistic-item">
        <p class="statistic-name">Likes</p>
        <p class="statistic-numbers">${image.likes}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Views</p>
        <p class="statistic-numbers">${image.views}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Comments</p>
        <p class="statistic-numbers">${image.comments}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Downloads</p>
        <p class="statistic-numbers">${image.downloads}</p>
      </li>
    </ul>
  </div>
</li>`;
}

export function createMarkup(images) {
  const elementMarkup = images.map(image => templateImage(image));
  const markup = elementMarkup.join('');
  markupRender(markup);
}

export function markupRender(markup) {
  gallery.insertAdjacentHTML('afterbegin', markup);
}
