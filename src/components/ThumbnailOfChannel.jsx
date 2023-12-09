import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ThumbnailOfChannel({ channelId }) {
  const { youtube } = useYoutubeApi();
  const {isLoading, error, data: channelInfo} = useQuery({
    queryKey: ['channel', channelId],
    queryFn: async () => youtube.getChannelInfo(channelId),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      {isLoading && <div className='shrink-0 w-12 h-12 rounded-full border'></div>}
      {error && <div className='shrink-0 w-12 h-12 rounded-full border'></div>}
      {channelInfo && <img className='shrink-0 object-contain w-12 h-12 rounded-full' src={channelInfo.url} alt='' />}      
    </>
  );
}

