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
  background-color: ${colors.tertiaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: 1px solid;
  border-radius: 4px;
`;

const ActiveSetComponent = styled.div`
  background-color: ${colors.activeSetBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: 1px solid;
  border-radius: 4px;
`;

const DefaultSetComponent = styled.div`
  background-color: ${colors.secondaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: 1px solid;
  border-radius: 4px;
`;


function ActiveSetGroup({ setGroup, setGroupRecording }) {
  console.log("active set group yes: ", setGroup);
  console.log("set group recording: ", setGroupRecording);

  const currentSet = setGroupRecording ? setGroupRecording.currentSet : 0;
  console.log("currentSet: ", currentSet);
  const numSets = setGroup.defaultNumSets;
  let setComponents = [];
  for (var i = 0; i < numSets; i++) {
    const Component2 = i == currentSet ? ActiveSetComponent : DefaultSetComponent;
    const setComponent = (<Component2>
      {setGroup.exercises.map((exercise) => {
        return (<div>{exercise.name}</div>)
      })}
    </Component2>);
    setComponents.push(setComponent);
  }
  return (
    <ActiveSetGroupContainer>
      {
      setComponents.map((comp) => { return comp })
      }
    </ActiveSetGroupContainer>
  );
}

ActiveSetGroup.propTypes = {
  // setGroup: any,
};

export default ActiveSetGroup;
