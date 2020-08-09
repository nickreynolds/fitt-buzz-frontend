import React from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';

const UnauthenticatedRoute = ({ children }) => {
  const [token] = useLocalStorage('token');
  console.log('UnauthenticatedRoute token: ', token);
  if (token) {
    console.log('redirect to homepage.');
    return <Redirect to={'/'} />;
  }

  console.log('render children.');
  return children;
};

export default UnauthenticatedRoute;
