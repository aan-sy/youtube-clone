import React, { useState } from 'react';
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchHeader() {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // 네트워크 요청
  }

  return (
    <header className='m-4'>
      <div className='flex items-center justify-center gap-x-4 md:gap-x-12'>
        <h1 className='flex items-center'>
          <FaYoutube className='text-brand h-full w-8 md:w-9' />
          <span className='hidden md:block font-oswald font-bold text-xl md:text-2xl'>YouTube</span>
        </h1>
        <form 
          className='h-9 md:h-10 flex items-center basis-96'
          onSubmit={handleSubmit}
        >
          <input 
            className='grow h-full py-2 px-4 border border-slate-300 rounded-l-3xl'
            type="text" 
            value={text}
            placeholder='검색'
            onChange={handleChange}
          />
          <button className='h-full py-2 px-5 border bg-gray-50 border-l-0 border-slate-300 rounded-r-3xl' aria-label='검색'>
            <IoSearchOutline />
          </button>
        </form>
      </div>

    </header>
  );
}

