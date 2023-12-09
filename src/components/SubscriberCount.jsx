import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function SubscriberCount({ channelId }) {
  const { youtube } = useYoutubeApi();
  const {isLoading, error, data: channelInfo} = useQuery({
    queryKey: ['channel', channelId],
    queryFn: async () => youtube.getChannelInfo(channelId),
    staleTime: 1000 * 60 * 5,
  })
  let count = channelInfo && convertToKo(Number(channelInfo.subscriberCount));

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {channelInfo && <p className='text-sm text-gray-500'>구독자 {count}</p>}
    </>
  );
}

const toFixedByRoundDown = (num) => {
  return Number(num.toString().split('.').map((ele, i) => i === 1 ? ele.slice(0, 2) : ele).join('.'))
}

const convertToKo = (num) => {
  if(typeof num !== 'number') return num;
  let str = '';
  if(num < 1000) {
    str = `${num}명`;
  } else if (num < 10000) {
    str = `${toFixedByRoundDown(num / 1000)}천명`
  } else if (num < 100000000) {
    str = `${toFixedByRoundDown(num / 10000)}만영`;
  } else {
    str = `${toFixedByRoundDown(num / 100000000)}억명`
  }
  return str;
}

