/**
 *
 * WeightTypeModalComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function WeightTypeModalComponent() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

WeightTypeModalComponent.propTypes = {};

export default WeightTypeModalComponent;
