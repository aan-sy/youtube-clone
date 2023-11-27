import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import axios from 'axios';
import ThumbnailOfChannel from '../components/ThumbnailOfChannel';

timeago.register('ko', ko);

export default function Videos() {
  const { search } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['popularVideos'],
    queryFn: async () => {
      console.log('fetching...')
      // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=KR&maxResults=30&key=${key}`
      return axios({method: 'get', url: '/data/populars.json'}).then(res => res.data.items)
    },
    staleTime: 1000 * 60 * 5,
  })

  if(isLoading) return <p>loading...</p>

  if(error) {
    console.error(error.response.status, error.response.statusText);
    return <p>Sorry, {error.response.statusText}</p>
  }

  return (
    <div className='mx-4'>
      {search && <p>검색 비디오 목록</p>}

      {search || <ul className='flex flex-wrap justify-center'>
        {videos && videos.map((video) => (
          <li key={video.id} className='grow sm:mx-2 mb-10 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6'>
            <a href="">
              <figure>
                <img className='w-full object-cover rounded-xl overflow-hidden' src={video.snippet.thumbnails.standard.url} alt={video.snippet.title}  />
                <figcaption className='mt-2 flex'>
                  <ThumbnailOfChannel id={video.snippet.channelId} title={video.snippet.channelTitle} />
                  <div>
                    <p className='break-words line-clamp-2'>{video.snippet.title}</p>
                    <p className='mt-2 text-gray-500'>{video.snippet.channelTitle}</p>
                    <TimeAgo className='mt-1 text-gray-500' datetime={video.snippet.publishedAt} locale='ko' />
                  </div>
                </figcaption>
              </figure>
            </a>
          </li>
        ))}
      </ul>}
    </div>
  );
}






