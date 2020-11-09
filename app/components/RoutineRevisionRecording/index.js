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
import ActiveSetGroup from '../ActiveSetGroup';

const ROUTINE_REVISION_RECORDING = gql`
  query ROUTINE_REVISION_RECORDING($id: String!) {
    routineRevisionRecording(id: $id) {
      id
      completedSetGroups
      routineRevision {
        routine {
          name
          id
          description
          createdBy {
            id
          }
        }
        setGroupPlacements {
          placement
          setGroup {
            exercises {
              name
              id
              description
              format {
                name
              }
            }
            defaultNumSets
          }
        }
      }
    }
  }
`;

const RoutineRecordingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`;

const RoutineHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  padding: 10px 10px 10px 10px;
`;

const Button = styled.button`
  background-color: ${colors.popElement1};
  color: white;
  font-size: 14px;
  padding: 4px 4px 4px 4px;
  border-radius: 3px;
  cursor: pointer;
`;

const RoutineSetGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

const SetGroupOuterContainer = styled.div`
  background-color: ${colors.secondaryBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: 1px solid;
  border-radius: 4px;
`;

const SetGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  border-right: 1px solid;
`;

const SetContainer = styled.div``;

const NumSetsContainer = styled.div``;

function RoutineRevisionRecording({ id }) {
  const [errorText, setErrorText] = useState('');

  const [userId] = useLocalStorage('userId');
  const { loading, error, data } = useQuery(ROUTINE_REVISION_RECORDING, {
    variables: { id },
  });

  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  console.log('data: ', data);

  return (
    <RoutineRecordingContainer>
      <RoutineHeader>
        <>Name: {data.routineRevisionRecording.routineRevision.routine.name}</>
        <>
          Completed Set Groups:{' '}
          {data.routineRevisionRecording.completedSetGroups}
        </>
      </RoutineHeader>
      {errorText && <span>{errorText}</span>}
      <RoutineSetGroups>
        {data.routineRevisionRecording.routineRevision.setGroupPlacements.map(
          (setGroupPlacement, i) => {
            if (i === data.routineRevisionRecording.completedSetGroups) {
              return <ActiveSetGroup setGroup={setGroupPlacement.setGroup} />
            } else {
            const setGroup = setGroupPlacement.setGroup;
            console.log('setGroup: ', setGroup);
            return (
              <SetGroupOuterContainer>
                <SetGroupContainer>
                  {setGroup.exercises.map(exercise => {
                    return <SetContainer>{exercise.name}</SetContainer>;
                  })}
                </SetGroupContainer>
                <NumSetsContainer>
                  {' - x' + setGroup.defaultNumSets}
                </NumSetsContainer>
              </SetGroupOuterContainer>
            );
                }
          },
        )}
      </RoutineSetGroups>
    </RoutineRecordingContainer>
  );
}

RoutineRevisionRecording.propTypes = {
  id: String,
};

export default RoutineRevisionRecording;
