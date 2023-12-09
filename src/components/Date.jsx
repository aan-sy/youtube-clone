import React from 'react';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
timeago.register('ko', ko);

export default function Date({ datetime, locale = 'en'}) {
  return (
    <TimeAgo className='text-gray-500 text-sm' datetime={datetime} locale={locale} />
  );
}

