export class Youtube {
  constructor(client) {
    this.client = client;
  }

  async getThumbnailUrl(channelId) {
    return this.#byChannelId(channelId);
  } 

  async getVideos(keyword) {
    return keyword ? this.#byKeyword(keyword) : this.#mostPopular();
  }

  async #byChannelId(channelId) {
    return this.client
      .channels({
        params: {
          part: 'snippet',
          id: channelId,
        }
      })
      .then(res => res.data.items[0].snippet.thumbnails.default.url)
  }

  async #byKeyword(keyword) {
    return this.client
      .search({
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
    return this.client
      .videos({
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