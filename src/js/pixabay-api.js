'use strict';

import axios from 'axios';

export class ImagesAPI {
  constructor(userSearchRequest) {
    this.BASE_URL = 'https://pixabay.com';
    this.ENDPOINT = '/api/';
    this.KEY = 'key=42471766-4e6ef41ee0191e88bcacb27c7';
    this.parameters = {
      q: `&q=${userSearchRequest}`,
      image_type: '&image_type=photo',
      orientation: '&orientation=horizontal',
      safesearch: '&safesearch=true',
    };

    this.PARAMS = '';

    for (const parameter of Object.values(this.parameters)) {
      this.PARAMS += parameter;
    }

    const url = `${this.BASE_URL}${this.ENDPOINT}?${this.KEY}${this.PARAMS}`;
    this.URL = url;
  }

  getImages() {
    return fetch(this.URL).then(response => response.json());
  }
}
