import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ThumbnailOfChannel({ id, title }) {
  const {isLoading, error, data: thumbnailUrl} = useQuery({
    queryKey: ['thumbnail'],
    queryFn: async () => {
      console.log('fetch thumbnail..');
      // `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${key}`
      return axios({ method: 'get', url: '/data/channel.json'}).then(res => res.data.items[0].snippet.thumbnails.default.url)
    },
    staleTime: 1000 * 60 * 5,
  })
  
  if(isLoading) return <div className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full border'></div>

  if(error) {
    console.error(error.response.status, error.response.statusText);
    return <div className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full border'></div>
  }

  return (
    <>
      {thumbnailUrl && <img className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full' src={thumbnailUrl} alt={title} />}      
    </>
  );
}

