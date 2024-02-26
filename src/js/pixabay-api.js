'use strict';

import axios from 'axios';
export class ImagesAPI {
  constructor(userSearchRequest, page) {
    this.BASE_URL = 'https://pixabay.com';
    this.ENDPOINT = '/api/';
    this.PARAMS = {
      key: '42471766-4e6ef41ee0191e88bcacb27c7',
      q: userSearchRequest,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 150,
    };

    this.URL = `${this.BASE_URL}${this.ENDPOINT}`;
  }

  async getImages() {
    const response = await axios.get(this.URL, { params: this.PARAMS });
    return response.data;
  }
}
