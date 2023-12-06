import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube.getVideos(keyword),
    staleTime: 1000 * 60 * 5,
  })

  if(isLoading) return <p>loading...</p>

  if(error) {
    console.error(error.response.status, error.response.statusText);
    return <p>Sorry, {error.response.statusText}</p>
  }

  return (
    <div className='mx-4'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {videos && videos.map(video => (
          <VideoCard key={video.id} video={ video } />
        ))}
      </ul>
    </div>
  );
}






