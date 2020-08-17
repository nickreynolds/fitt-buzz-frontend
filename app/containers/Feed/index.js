/**
 *
 * Feed
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

import styled from 'styled-components';
import messages from './messages';
import ExerciseFeed from 'components/ExerciseFeed';
import RoutineFeed from 'components/RoutineFeed';

const StyledTabList = styled(TabList)`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid;
`;

const StyledTabTitle = styled(Tab)`
  padding: 10px;
  display: inline;
`;

export function Feed() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <Helmet>
        <title>Feed</title>
        <meta name="description" content="Description of Feed" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Tabs
        selectedIndex={tabIndex}
        onSelect={tabIndex => setTabIndex(tabIndex)}
      >
        <StyledTabList>
          <StyledTabTitle>Routines</StyledTabTitle>
          <StyledTabTitle>Exercises</StyledTabTitle>
          <StyledTabTitle>My Routines</StyledTabTitle>
        </StyledTabList>
        <TabPanel>
          <RoutineFeed />
        </TabPanel>
        <TabPanel>
          <ExerciseFeed />
        </TabPanel>
        <TabPanel>
          <RoutineFeed />
        </TabPanel>
      </Tabs>
    </div>
  );
}

Feed.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Feed);
