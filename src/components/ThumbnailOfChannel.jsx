import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FakeYoutube } from '../api/fakeYoutube';
import { Youtube } from '../api/youtube';

export default function ThumbnailOfChannel({ channelId }) {
  const {isLoading, error, data: url} = useQuery({
    queryKey: ['thumbnail', channelId],
    queryFn: () => {
      const youtube = new FakeYoutube();
      // const youtube = new Youtube();
      return youtube.getThumbnailUrl(channelId);
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
      {url && <img className='shrink-0 mr-2 object-contain w-12 h-12 rounded-full' src={url} alt='' />}      
    </>
  );
}

