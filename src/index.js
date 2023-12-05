import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Videos from './routes/Videos';
import VideoDetail from './routes/VideoDetail';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Videos />
      },
      {
        path: "/videos",
        element: <Videos />
      },
      {
        path: "/videos/:keyword",
        element: <Videos />
      },
      {
        path: "/videos/watch/:videoId",
        element: <VideoDetail />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
