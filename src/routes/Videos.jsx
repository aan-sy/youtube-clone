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
    staleTime: 1000 * 60 * 1,
  })

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>something is wrong...</p>}
      <div className='px-4'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-x-4'>
          {videos && videos.map(video => (
            <VideoCard key={ video.id } video={ video } />
          ))}
        </ul>
      </div>
    </>
  );
}






