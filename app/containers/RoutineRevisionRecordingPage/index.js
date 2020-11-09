/**
 *
 * RoutinePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useParams, withRouter } from 'react-router';
import RoutineRevisionRecording from 'components/RoutineRevisionRecording/Loadable';

import messages from './messages';

export function RoutineRevisionRecordingPage(props) {
  let id = props.match.params.id;
  console.log('id: ', id);
  return (
    <div>
      <RoutineRevisionRecording id={id} />
    </div>
  );
}

RoutineRevisionRecordingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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

export default compose(
  withRouter,
  withConnect,
)(RoutineRevisionRecordingPage);
