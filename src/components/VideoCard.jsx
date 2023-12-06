import React from 'react';
import { Link } from "react-router-dom";
import ThumbnailOfChannel from './ThumbnailOfChannel';
import Date from './Date';

export default function VideoCard({ video }) {
  const { title, channelTitle, publishedAt, thumbnails, channelId } = video.snippet;

  return (
    <li className='sm:mx-2 mb-10'>
      <Link to='' >
        <figure>
          <img className='w-full rounded-xl overflow-hidden' src={thumbnails.medium.url} alt={title} />
          <figcaption className='mt-2 flex'>
            <ThumbnailOfChannel channelId={channelId} />
            <div>
              <p className='break-words line-clamp-2'>{title}</p>
              <p className='mt-2 text-gray-500'>{channelTitle}</p>
              <Date datetime={publishedAt} locale='ko' />
            </div>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
}
