import React from 'react';
import { useParams } from 'react-router-dom';

export default function Videos() {
  let { search } = useParams();

  return (
    <div>
      {search || <p>인기 비디오 목록</p>}
      {search && <p>검색 비디오 목록</p>}
    </div>
  );
}

