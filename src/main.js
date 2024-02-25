'use strict';

import { ImagesAPI } from './js/pixabay-api';
import * as renderFunctions from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const izitoastMessageOptions = {
  message: 'The search field must be filled!',
  messageColor: 'white',
  backgroundColor: 'red',
  close: false,
  position: 'topRight',
  progressBar: false,
  animateInside: false,
  timeout: 3000,
};

const refs = {
  form: document.querySelector('.form'),
  inputSearch: document.querySelector('[type="search"]'),
  searchButton: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadButton: document.querySelector('.btn-load-more'),
};

refs.form.addEventListener('submit', fetchOnPixabayAPI);
refs.loadButton.addEventListener('click', loadMoreImages);

let page = 1;
let userValue;
let isTheSame;

function fetchOnPixabayAPI(evt) {
  evt.preventDefault();
  refs.loader.classList.remove('hidden');

  const userSearchWords = refs.inputSearch.value.trim(); // валідація даних, які ввів користувач
  const userSearchParams = userSearchWords.split(' ').join('+'); // валідація даних, які ввів користувач

  if (userSearchWords === '') {
    refs.loader.classList.add('hidden'); // перевірка на порожній рядок.
    iziToast.show(izitoastMessageOptions);
    return;
  }

  isTheSame = isTheUserValueTheSame(userSearchParams); // Якщо значення користувача теж саме, функція поверне true, в іншому випадку false.

  if (!isTheSame) {
    refs.loadButton.classList.add('hidden'); // перевірка, чи значення користувача інше.
    refs.gallery.innerHTML = '';
    page = 1;
  }

  const imagesApi = new ImagesAPI(userSearchParams);
  refs.form.reset();

  imagesApi
    .getImages()
    .then(respData => {
      checkTheSearchResults(respData.hits);

      if (!(respData.totalHits < 15)) {
        userValue = userSearchParams;
        checkQuantityOfElements(respData.totalHits);
      }

      userValue = userSearchParams;
    })
    .catch(error =>
      iziToast.show({ ...izitoastMessageOptions, message: 'Bad request' })
    )
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
}

function checkQuantityOfElements(totalQuantity) {
  const pagesQuantity = Math.ceil(totalQuantity / 15);

  console.log(totalQuantity);

  if (page <= pagesQuantity) {
    refs.loadButton.classList.remove('hidden');
  } else {
    refs.loadButton.classList.add('hidden');
    iziToast.show({
      ...izitoastMessageOptions,
      message: `We're sorry, but you've reached the end of search results.`,
      backgroundColor: 'blue',
    });
  }
}

function loadMoreImages() {
  refs.loadButton.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  refs.loader.classList.toggle('under-btn');

  page += 1;
  const imagesAPI = new ImagesAPI(userValue, page);

  imagesAPI.getImages().then(respData => {
    checkTheSearchResults(respData.hits);

    checkQuantityOfElements(respData.totalHits);

    refs.loader.classList.add('hidden');
    refs.loader.classList.toggle('under-btn');
  });
}

function checkTheSearchResults(searchResults) {
  if (searchResults.length !== 0) {
    renderFunctions.createMarkup(searchResults);
    createModalWindows();
  } else {
    iziToast.show({
      ...izitoastMessageOptions,
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: 'red',
    });
  }
}

function isTheUserValueTheSame(userSearchParams) {
  if (page > 1) {
    return userValue == userSearchParams;
  }
}

function createModalWindows() {
  const galleryItem = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250,
  });

  galleryItem.on('show.simplelightbox');
  galleryItem.refresh();
}
