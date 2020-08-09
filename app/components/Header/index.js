import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import HeaderLinkButton from './HeaderLinkButton';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  const [token] = useLocalStorage('token');
  console.log('token: ', token);
  if (token) {
    console.log('yes token found');
    return (
      <div>
        <NavBar>
          <HeaderLinkButton
            onClick={e => {
              writeStorage('token', '');
            }}
          >
            <FormattedMessage {...messages.logout} />
          </HeaderLinkButton>
        </NavBar>
      </div>
    );
  }

  console.log('no token found');
  return (
    <div>
      <NavBar>
        <HeaderLink to="/login">
          <FormattedMessage {...messages.login} />
        </HeaderLink>
        <HeaderLink to="/signup">
          <FormattedMessage {...messages.signup} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
