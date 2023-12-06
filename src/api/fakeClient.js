import axios from 'axios';

export class FakeClient {
  constructor() {}

  async channels() {
    return axios.get('/data/channel.json');
  }

  async search() {
    return axios.get(`/data/search.json`);
  }

  async videos() {
    return axios.get(`/data/populars.json`);
  }
}