import React from 'react';
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>🤔 Sorry, an unexpected error has occured.</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

