/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';
import LOGIN from '../../graphql/mutations/Login';
import { writeStorage } from '@rehooks/local-storage';
import H1 from 'components/H1';
import messages from './messages';
import UnauthenticatedRoute from 'components/auth/UnauthenticatedRoute';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);
  return (
    <UnauthenticatedRoute>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page of fitt.buzz" />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          try {
            const result = await login({ variables: { username, password } });
            console.log('result: ', result);
            writeStorage('token', result.data.login.token);
          } catch (ex) {
            console.log('ex: ', ex);
          }
        }}
      >
        <input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </UnauthenticatedRoute>
  );
}
