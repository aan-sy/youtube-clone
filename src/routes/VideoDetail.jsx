import React from 'react';
import { useLocation } from 'react-router-dom';
import ThumbnailOfChannel from '../components/ThumbnailOfChannel';
import SubscriberCount from '../components/SubscriberCount';
import RelatedVideos from '../components/RelatedVideos';

export default function VideoDetail() {
  const { state: video } = useLocation();
  const { id, snippet: {title, channelTitle, channelId, description} } = video;
  
  return (
    <section className='grid grid-cols-1 lg:grid-cols-[8fr_2fr] px-4 gap-8'>
      <figure>
        <iframe className='aspect-video w-full mb-4 rounded-xl' type="text/html" src={`https://www.youtube.com/embed/${id}`} title={title}></iframe>
        <figcaption>
          <h2 className='font-bold text-lg mb-4'>{title}</h2>
          <div className='flex gap-2 items-center mb-4'>
            <ThumbnailOfChannel channelId={ channelId } />
            <div className='flex flex-col'>
              <p>{channelTitle}</p>
              <SubscriberCount channelId={ channelId } />
            </div>
          </div>
          {(description !== '') && <p className='text-sm lg:text-base p-4 bg-gray-100 rounded-xl whitespace-pre-wrap'>{description}</p>}
        </figcaption>
      </figure>
      <aside className='w-full lg:w-96'>
        <RelatedVideos channelTitle={ channelTitle } />
      </aside>
    </section>
  );
}

