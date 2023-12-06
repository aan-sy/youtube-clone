import React, { createContext, useContext } from 'react';
import { FakeYoutube } from './../api/fakeYoutube';
import { Youtube } from './../api/youtube';

const YoutubeApiContext = createContext();

const youtube = new FakeYoutube();
// const youtube = new Youtube();

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>
    {children}
  </YoutubeApiContext.Provider>
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}