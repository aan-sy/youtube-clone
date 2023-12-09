import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from '../components/VideoCard';

export default function RelatedVideos({ channelTitle }) {
  const keyword = channelTitle;
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube.getVideos(keyword),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <ul>
          {videos.map(video => <VideoCard key={video.id} video={video} aside={true} />)}
        </ul>
      )}
    </>
  );
}

