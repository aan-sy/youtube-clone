import { decodeHTML } from 'entities';

export class Youtube {
  constructor(client) {
    this.client = client;
  }

  async getChannelInfo(channelId) {
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
      .then(res => res.data.items[0])
      .then(data => (
        {
          url: data.snippet.thumbnails.default.url,
          subscriberCount: data.statistics.subscriberCount
        }
      ))
  }

  async #byKeyword(keyword) {
    return this.client
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        }
      })
      .then(res => res.data.items)
      .then(items => items.map(item => ({
        ...item, 
        id: item.id.videoId, 
        snippet: {...item.snippet, title: decodeHTML(item.snippet.title)}
      })))
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