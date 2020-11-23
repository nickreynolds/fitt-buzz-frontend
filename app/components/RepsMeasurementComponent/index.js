/**
 *
 * RepsMeasurementComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RepsMeasurementComponent() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RepsMeasurementComponent.propTypes = {};

export default memo(RepsMeasurementComponent);
