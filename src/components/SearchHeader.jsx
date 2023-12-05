import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchHeader() {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`)
  }
  const { keyword } = useParams();
  useEffect(() => {
    setText(() => keyword ? keyword : '')
  }, [keyword])

  return (
    <header className='m-4 flex items-center gap-4'>
      <Link to='/' className='flex items-center' onClick={() => {setText('')}}>
        <FaYoutube className='text-brand h-full w-8 md:w-9' />
        <h1 className='hidden md:block font-oswald font-bold text-xl md:text-2xl'>YouTube</h1>
      </Link>
      <form className='w-full h-9 md:h-10 flex items-center justify-center' onSubmit={handleSubmit}>
        <input 
          className='basis-96 h-full py-2 px-4 border border-slate-300 rounded-l-3xl'
          type="text" 
          value={text}
          placeholder='검색'
          onChange={handleChange}
        />
        <button className='h-full py-2 px-5 border bg-gray-50 border-l-0 border-slate-300 rounded-r-3xl' aria-label='검색'>
          <IoSearchOutline />
        </button>
      </form>
    </header>
  );
}

