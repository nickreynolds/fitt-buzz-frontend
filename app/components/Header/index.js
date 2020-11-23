import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import styled from 'styled-components';
import { useRouteMatch, withRouter } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import HeaderLinkButton from './HeaderLinkButton';
import messages from './messages';

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #393d42;
  padding: 5px 5px 5px 5px;
`;

const LeftNavDiv = styled.div``;

const RightNavDiv = styled.div``;

function Header() {
  const [token] = useLocalStorage('token');
  const rootMatch = useRouteMatch({ path: '/', strict: true });
  const recordingMatch = useRouteMatch({
    path: '/recording/:id',
    strict: true,
  });
  const myHistoryMatch = useRouteMatch({ path: '/my-history', strict: true });
  const exploreExercisesMatch = useRouteMatch({
    path: '/explore-exercises',
    strict: true,
  });
  const exploreRoutinesMatch = useRouteMatch({
    path: '/explore-routines',
    strict: true,
  });

  if (token) {
    return (
      <NavBarDiv>
        <LeftNavDiv>
          <HeaderLink to="/" active={rootMatch && rootMatch.isExact}>
            My Routines
          </HeaderLink>
          <HeaderLink
            to="/my-history"
            active={myHistoryMatch || recordingMatch}
          >
            My History
          </HeaderLink>
          <HeaderLink to="/explore-routines" active={exploreRoutinesMatch}>
            Find Routines
          </HeaderLink>
          <HeaderLink to="/explore-exercises" active={exploreExercisesMatch}>
            Exercises
          </HeaderLink>
        </LeftNavDiv>
        <RightNavDiv>
          <HeaderLinkButton
            onClick={() => {
              writeStorage('token', '');
            }}
          >
            <FormattedMessage {...messages.logout} />
          </HeaderLinkButton>
        </RightNavDiv>
      </NavBarDiv>
    );
  }

  return (
    <div>
      <NavBarDiv>
        <HeaderLink to="/login">
          <FormattedMessage {...messages.login} />
        </HeaderLink>
        <HeaderLink to="/signup">
          <FormattedMessage {...messages.signup} />
        </HeaderLink>
      </NavBarDiv>
    </div>
  );
}

export default withRouter(Header);
