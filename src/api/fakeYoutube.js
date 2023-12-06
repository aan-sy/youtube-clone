import axios from 'axios';

export class FakeYoutube {
  constructor() {}

  async getThumbnailUrl (channelId) {
    return this.#byChannelId(channelId);
  } 

  async #byChannelId(channelId) {
    return axios
      .get('/data/channel.json')
      .then(res => res.data.items[0].snippet.thumbnails.default.url)
  }

  async getVideos (keyword) {
    return keyword ? this.#byKeyword() : this.#mostPopular();
  }

  async #byKeyword() {
    return axios
      .get(`/data/search.json`)
      .then(res => res.data.items)
      .then(items => items.map(item => {
        let id = '';
        switch(item.id.kind) {
          case 'youtube#video': 
            id = item.id.videoId;
            break;
          case 'youtube#channel':
            id = item.id.channelId;
            break;
          case 'youtube#playlist':
            id = item.id.playlistId;
        }
        return {...item, id}
      }))
  }

  async #mostPopular() {
    return axios
      .get(`/data/populars.json`)
      .then(res => res.data.items)
  }
}