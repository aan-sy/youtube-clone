import axios from 'axios';

export class Youtube {
  #httpClient;
  constructor() {
    this.#httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    })
  }

  async getThumbnailUrl(channelId) {
    return this.#byChannelId(channelId);
  } 

  async #byChannelId(channelId) {
    return this.#httpClient
    .get('channels', {
      params: {
        part: 'snippet',
        id: channelId,
      }
    })
    .then(res => res.data.items[0].snippet.thumbnails.default.url)
  }

  async getVideos(keyword) {
    return keyword ? this.#byKeyword(keyword) : this.#mostPopular();
  }

  async #byKeyword(keyword) {
    return this.#httpClient
      .get('search' , {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: keyword,
        }
      })
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
    return this.#httpClient
      .get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 25,
        }
      })
      .then(res => res.data.items)
  }
}