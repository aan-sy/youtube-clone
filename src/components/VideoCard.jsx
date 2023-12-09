import React from 'react';
import { useNavigate } from "react-router-dom";

import ThumbnailOfChannel from './ThumbnailOfChannel';
import Date from './Date';

export default function VideoCard({ video, aside }) {
  const { title, channelTitle, publishedAt, thumbnails, channelId } = video.snippet;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, { state: video })
  }

  return (
    <>
      <li className={`flex ${!aside ? 'flex-col': ''} gap-2 ${!aside ? 'mb-5 sm:mb-10' : 'mb-2'} cursor-pointer`} onClick={handleClick}>
        <img className={`${!aside ? 'w-full' : 'w-[168px] h-[94px]'} shrink-0 rounded-xl overflow-hidden`} src={thumbnails.medium.url} alt={title} />
        <div className='flex gap-2'>
          {aside || <ThumbnailOfChannel channelId={channelId} />}
          <div>
            <p className={`break-words line-clamp-2 mb-2 ${aside && 'text-sm'}`}>{title}</p>
            <p className={`text-gray-500 text-sm ${aside && 'text-xs'}`}>{channelTitle}</p>
            <Date datetime={publishedAt} locale='ko' />
          </div>
        </div>
      </li>
    </>

  );
}


