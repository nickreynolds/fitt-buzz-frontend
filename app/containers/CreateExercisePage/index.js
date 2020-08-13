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
import CreateExercise from 'components/CreateExercise/Loadable';

import messages from './messages';

export function CreateExercisePage() {
  return (
    <div>
      <Helmet>
        <title>CreateExercisePage</title>
        <meta name="description" content="Description of CreateExercisePage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <CreateExercise />
    </div>
  );
}

CreateExercisePage.propTypes = {
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

export default compose(withConnect)(CreateExercisePage);
