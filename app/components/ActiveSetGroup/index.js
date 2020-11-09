/**
 *
 * Routine
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useQuery, gql, useMutation } from '@apollo/client';
import { colors } from '../../utils/constants';
import useLocalStorage from '@rehooks/local-storage';


const ActiveSetGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
`;


function ActiveSetGroup({ setGroup }) {
  console.log("setGroup: ", setGroup);
  return (
    <ActiveSetGroupContainer>
      {"asdf"}
    </ActiveSetGroupContainer>
  );
}

ActiveSetGroup.propTypes = {
  setGroup: any,
};

export default ActiveSetGroup;
