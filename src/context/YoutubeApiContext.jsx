import React, { createContext, useContext } from 'react';
import { Youtube } from './../api/youtube';
import { Client } from '../api/client';
import { FakeClient } from '../api/fakeClient';

const YoutubeApiContext = createContext();

// const client = new Client();
const client = new FakeClient();
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>
    {children}
  </YoutubeApiContext.Provider>
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}