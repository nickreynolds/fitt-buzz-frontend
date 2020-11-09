/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthenticatedRoute from 'components/auth/AuthenticatedRoute';
import RoutinePage from 'containers/RoutinePage/Loadable';
import RoutineRevisionRecordingPage from 'containers/RoutineRevisionRecordingPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ExerciseFeed from 'components/ExerciseFeed';
import RoutineFeed from 'components/RoutineFeed';
import MyRoutinesFeed from 'components/MyRoutinesFeed';
import MyHistoryFeed from 'components/MyHistoryFeed';

import GlobalStyle from '../../global-styles';
import CreateExercisePage from 'containers/CreateExercisePage/Loadable';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Fitt.Buzz"
        defaultTitle="Fitt.Buzz"
      >
        <meta name="description" content="Fitt.Buzz application" />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />

        <AuthenticatedRoute>
          <Route exact path="/" component={MyRoutinesFeed} />
          <Route exact path="/my-history" component={MyHistoryFeed} />
          <Route exact path="/explore-routines" component={RoutineFeed} />
          <Route exact path="/explore-exercises" component={ExerciseFeed} />
          <Route path="/routine/:routineId" component={RoutinePage} />
          <Route
            path="/recording/:id"
            component={RoutineRevisionRecordingPage}
          />
          <Route path="/create-exercise" component={CreateExercisePage} />
        </AuthenticatedRoute>
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
