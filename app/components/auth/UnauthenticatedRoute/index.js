import React from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';

const UnauthenticatedRoute = ({ children }) => {
  const [token] = useLocalStorage('token');
  if (token) {
    return <Redirect to={'/'} />;
  }

  return children;
};

export default UnauthenticatedRoute;
