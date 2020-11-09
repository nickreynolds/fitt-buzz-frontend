import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import A from './A';
import Img from './Img';
import HeaderLink from './HeaderLink';
import HeaderLinkButton from './HeaderLinkButton';
import Banner from './banner.jpg';
import messages from './messages';
import styled from 'styled-components';

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftNavDiv = styled.div`
`;

const RightNavDiv = styled.div`
`;

function Header() {
  const [token] = useLocalStorage('token');
  console.log('token: ', token);
  if (token) {
    console.log('yes token found');
    return (
      <NavBarDiv>
        <LeftNavDiv>
          <HeaderLink to="/">My Routines</HeaderLink>
          <HeaderLink to="/my-history">My History</HeaderLink>
          <HeaderLink to="/explore-routines">Find Routines</HeaderLink>
          <HeaderLink to="/explore-exercises">Exercises</HeaderLink>
        </LeftNavDiv>
        <RightNavDiv>
          <HeaderLinkButton
            onClick={e => {
              writeStorage('token', '');
            }}
          >
            <FormattedMessage {...messages.logout} />
          </HeaderLinkButton>
        </RightNavDiv>
      </NavBarDiv>
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
