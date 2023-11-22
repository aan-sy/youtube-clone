import React, { useMemo, useState } from 'react';
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  useMemo(() => {console.error(error)}, [])

  const [position, setPosition] = useState({x: 0, y: 0});
  const moveHandler = (e) => {
    const speed = 2;
    setPosition({
      x: (window.innerWidth - e.clientX * speed) / 100,
      y: (window.innerHeight - e.clientY * speed) / 100,
    })
  }


  return (
    <section 
      className='p-4 w-full h-screen flex flex-col items-center justify-center text-center'
      onMouseMove={moveHandler}
    >
      <img 
        className='w-60 md:w-auto'
        style={{transform: `translate(${position.x}px, ${position.y}px)`, transitionTimingFunction: 'ease'}}
        src='/images/errorIcon.png' 
        alt='error' 
      />
      <h2 className='text-4xl font-bold mt-12'>
          {`${error.status} - ${error.statusText}` || error.message}
      </h2>
      <p className='text-xl md:text-2xl font-semibold mt-4'>
        Sorry, an unexpected error has occured.
      </p>
    </section>
  );
}

