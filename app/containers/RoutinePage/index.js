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
import Routine from 'components/Routine/Loadable';

import messages from './messages';

export function RoutinePage(props) {
  let routineId = props.match.params.routineId;
  console.log('routineId: ', routineId);
  return (
    <div>
      <Routine routineId={routineId} />
    </div>
  );
}

RoutinePage.propTypes = {
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
)(RoutinePage);
