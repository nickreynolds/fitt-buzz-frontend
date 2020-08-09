import React from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalStorage } from '@rehooks/local-storage';

const AuthenticatedRoute = ({ children }) => {
  console.log('rendering authenticated route..');
  const [token] = useLocalStorage('token');
  if (!token) {
    return <Redirect to={'/login'} />;
  }

  return children;
};

export default AuthenticatedRoute;
