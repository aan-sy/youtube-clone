import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      // const url = keyword ? 
      //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=` :
      //   'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=KR&maxResults=30&key='
      const url = `/data/${keyword ? 'search' : 'populars'}.json`
      return axios({method: 'get', url}).then(res => res.data.items)
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
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {videos && videos.map(video => (
          <VideoCard key={video.etag} video={ video } />
        ))}
      </ul>
    </div>
  );
}






