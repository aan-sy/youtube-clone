import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ThumbnailOfChannel({ channelId }) {
  const {isLoading, error, data: thumbnailUrl} = useQuery({
    queryKey: ['thumbnail', channelId],
    queryFn: async () => {
      // const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=`;
      const url = '/data/channel.json'; 
      return axios({ method: 'get', url}).then(res => res.data.items[0].snippet.thumbnails.default.url)
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
      {thumbnailUrl && <img className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full' src={thumbnailUrl} alt='' />}      
    </>
  );
}

