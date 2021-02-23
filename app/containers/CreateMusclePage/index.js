/**
 *
 * CreateExercisePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import CreateMuscle from 'components/CreateMuscle/Loadable';

import messages from './messages';
import ViewMuscles from '../../components/ViewMuscles';
import styled from 'styled-components';

const SideBySideDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export function CreateMusclePage() {
  return (
    <div>
      <Helmet>
        <title>CreateMusclePage</title>
        <meta name="description" content="Description of CreateMusclePage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <SideBySideDiv>
        <ViewMuscles />
        <CreateMuscle />
      </SideBySideDiv>
    </div>
  );
}

CreateMusclePage.propTypes = {
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

export default compose(withConnect)(CreateMusclePage);
