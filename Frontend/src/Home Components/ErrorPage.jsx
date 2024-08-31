import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div>
      <h1>Unexpected Application Error!</h1>
      {error.status === 404 ? (
        <div>
          <h2>404 Not Found</h2>
          <p>The page you are looking for doesn't exist talk with Kaushik he will guide you because you are a noob.</p>
        </div>
      ) : (
        <div>
          <p>An error occurred: {error.statusText || error.message}</p>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
