import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ThumbnailOfChannel({ channelId }) {
  const { youtube } = useYoutubeApi();
  const {isLoading, error, data: url} = useQuery({
    queryKey: ['thumbnail', channelId],
    queryFn: () => youtube.getThumbnailUrl(channelId),
    staleTime: 1000 * 60 * 5,
  })
  
  if(isLoading) return <div className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full border'></div>

  if(error) {
    console.error(error.response.status, error.response.statusText);
    return <div className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full border'></div>
  }

  return (
    <>
      {url && <img className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full' src={url} alt='' />}      
    </>
  );
}

