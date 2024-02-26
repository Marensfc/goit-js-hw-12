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
let userFirstValue;

async function fetchOnPixabayAPI(evt) {
  evt.preventDefault();
  refs.loader.classList.remove('hidden');

  const userSearchWords = refs.inputSearch.value.trim(); // валідація даних, які ввів користувач;
  const userSearchParams = userSearchWords.split(' ').join('+'); // валідація даних, які ввів користувач;

  if (userSearchWords === '') {
    refs.loader.classList.add('hidden'); // перевірка на порожній рядок.
    iziToast.show(izitoastMessageOptions);
    return;
  }

  const isTheSame = isTheUserValueTheSame(userSearchParams);

  if (!isTheSame) {
    refs.loadButton.classList.add('hidden');
    refs.gallery.innerHTML = '';
    page = 1;
  }

  const imagesApi = new ImagesAPI(userSearchParams);
  refs.form.reset();

  try {
    const data = await imagesApi.getImages();

    checkTheSearchResults(data.hits);

    if (!(data.totalHits < 15)) {
      checkQuantityOfElements(data.totalHits, imagesApi.PARAMS.per_page);
      return;
    }

    refs.loadButton.classList.add('hidden');
  } catch (error) {
    iziToast.show(
      { ...izitoastMessageOptions, message: error.message },
      console.log(error)
    );
  } finally {
    refs.loader.classList.add('hidden');
  }
}

function checkQuantityOfElements(totalQuantity, per_page) {
  const pagesQuantity = Math.ceil(totalQuantity / per_page);

  if (page < pagesQuantity) {
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

function scrollThePage() {
  const liElemHeight = renderFunctions.findTheHeightOfLi();
  window.scrollBy(0, liElemHeight * 2);
}

async function loadMoreImages() {
  refs.loadButton.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  refs.loader.classList.toggle('under-btn');

  page += 1;

  const imagesAPI = new ImagesAPI(userFirstValue, page);

  try {
    const data = await imagesAPI.getImages();

    checkTheSearchResults(data.hits);
    checkQuantityOfElements(data.totalHits, imagesAPI.PARAMS.per_page);

    refs.loader.classList.add('hidden');
    refs.loader.classList.toggle('under-btn');
    scrollThePage();
  } catch (error) {
    iziToast.show({ ...izitoastMessageOptions, message: error.message });
    refs.loader.classList.add('hidden');
  }
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

function isTheUserValueTheSame(userNewValue) {
  if (page === 1) {
    userFirstValue = userNewValue;
    return;
  }

  return userFirstValue == userNewValue;
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
