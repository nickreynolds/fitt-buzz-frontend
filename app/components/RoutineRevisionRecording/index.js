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
      createdAt
      routineRevision {
        id
        routine {
          id
          name
        }
        setGroupPlacements {
          setGroup {
            id
            exercises {
              id
              name
              format {
                id
                name
              }
            }
            defaultNumSets
          }
        }
      }
      completedSetGroups
      setGroupRecordings {
        id
        setGroup {
          id
          exercises {
            id
            name
            description
            format {
              id
              name
            }
          }
          defaultNumSets
        }
        completedSets
        setRecordings {
          id
          completedExercises
          exerciseRecordings {
            id
            exercise {
              id
              name
              format {
                id
                name
              }
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
  console.log("RoutineRevisionRecording 1");
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

  console.log("RoutineRevisionRecording 2");
  return (
    <RoutineRecordingContainer>
      <RoutineHeader>
        <>{data.routineRevisionRecording.routineRevision.routine.name}</>
        <>
          Completed Set Groups:{' '}
          {data.routineRevisionRecording.completedSetGroups}
        </>
      </RoutineHeader>
      {errorText && <span>{errorText}</span>}
      <RoutineSetGroups>
        {data.routineRevisionRecording.routineRevision.setGroupPlacements.map(
          (setGroupPlacement, i) => {
            const setGroupRecording = data.routineRevisionRecording.setGroupRecordings.find((setGroupRecording) => { setGroupRecording.setGroup.id === setGroupPlacement.setGroup.id});

            if (i === data.routineRevisionRecording.completedSetGroups) {
              return <ActiveSetGroup setGroup={setGroupPlacement.setGroup} setGroupRecording={setGroupRecording} />
            } else {
              const setGroup = setGroupPlacement.setGroup;
              console.log('setGroup: ', setGroup);
              return (
                <SetGroupOuterContainer>
                  <SetGroupContainer>
                    {setGroup.exercises.map(exercise => {
                      console.log("put exercise");
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
