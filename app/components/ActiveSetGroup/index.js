/**
 *
 * Routine
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { useQuery, gql, useMutation } from '@apollo/client';
import useLocalStorage from '@rehooks/local-storage';
import messages from './messages';
import { colors } from '../../utils/constants';
import ActiveExerciseComponent from '../ActiveExerciseComponent';

const ActiveSetGroupContainer = styled.div`
  background-color: ${colors.tertiaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: none;
  border-radius: 4px;
`;

const ActiveSetComponent = styled.div`
  background-color: ${colors.activeSetBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: none;
  border-radius: 4px;
`;

const DefaultSetComponent = styled.div`
  background-color: ${colors.secondaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: none;
  border-radius: 4px;
`;

const DefaultExerciseComponent = styled.div`
  background-color: ${colors.secondaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: none;
  border-radius: 4px;
`;

const MY_PREVOIUS_SET_GROUP_RECORDING = gql`
  query MY_PREVOIUS_SET_GROUP_RECORDING($setGroupId: String!) {
    myPreviousSetGroupRecording(setGroupId: $setGroupId) {
      id
      setRecordings {
        id
        exerciseRecordings {
          id
          exercise {
            id
          }
          measurableRecordings {
            id
            measurable {
              id
              name
            }
            value
          }
        }
      }
    }
  }
`;

function ActiveSetGroup({
  setGroup,
  setGroupRecording,
  routineRevisionRecordingId,
}) {
  console.log("setGroup.id: ", setGroup.id);
  const { loading, error, data } = useQuery(MY_PREVOIUS_SET_GROUP_RECORDING, {
    variables: { setGroupId: setGroup.id },
  });

  if (loading) {
    return <></>;
  }
  if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  console.log("data: ", data);
  const { myPreviousSetGroupRecording } = data;
  
  let numSets = setGroup.defaultNumSets;
  if (myPreviousSetGroupRecording) {
    console.log("myPreviousSetGroupRecording: ", myPreviousSetGroupRecording);
    numSets = myPreviousSetGroupRecording.setRecordings.length;
  }

  const currentSet = setGroupRecording ? setGroupRecording.completedSets : 0;
  // console.log("currentSet: ", currentSet);
  const setComponents = [];
  for (let i = 0; i < numSets; i++) {
    const isActiveSet = i == currentSet;
    const Component2 = isActiveSet ? ActiveSetComponent : DefaultSetComponent;
    // console.log("setGroupRecording: ", setGroupRecording);
    const activeExerciseIndex =
      setGroupRecording && setGroupRecording.setRecordings[i]
        ? setGroupRecording.setRecordings[i].exerciseRecordings.length
        : 0;
    const setRecording = myPreviousSetGroupRecording.setRecordings && myPreviousSetGroupRecording.setRecordings.length >= i && myPreviousSetGroupRecording.setRecordings[i];
    const setComponent = (
      <Component2 key={`${i}component`}>
        {setGroup.exercises.map((exercise, j) => {
          let exerciseRecording;
          if (setRecording && setRecording.exerciseRecordings) {
            setRecording.exerciseRecordings.forEach((exrec) => {
              if (exrec.exercise.id == exercise.id) {
                exerciseRecording = exrec;
              }
            })
          }
          console.log("exercise.id: ", exercise.id);
          console.log("exerciseRecording.exercise.id: ", exerciseRecording.exercise.id);
          if (isActiveSet && j == activeExerciseIndex) {
            return (
              <ActiveExerciseComponent
                key={`${j}activeSetGroup`}
                exercise={exercise}
                setGroup={setGroup}
                setGroupRecording={setGroupRecording}
                routineRevisionRecordingId={routineRevisionRecordingId}
                previousExerciseRecording={exerciseRecording}
              />
            );
          }
          return (
            <DefaultExerciseComponent key={`${j}defaultSetGroup`}>
              {exercise.name}
            </DefaultExerciseComponent>
          );
        })}
      </Component2>
    );
    setComponents.push(setComponent);
  }
  return (
    <ActiveSetGroupContainer>
      {setComponents.map(comp => comp)}
    </ActiveSetGroupContainer>
  );
}

ActiveSetGroup.propTypes = {
  // setGroup: any,
};

export default ActiveSetGroup;
