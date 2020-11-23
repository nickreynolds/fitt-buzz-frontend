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
import ActiveSetGroup from '../ActiveSetGroup';

// import ROUTINE_REVISION_RECORDING from "../../graphql/queries/RoutineRevisionRecording";
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
              description
              format {
                id
                name
                measurables {
                  id
                  name
                }
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
              measurables {
                id
                name
              }
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

console.log('ROUTINE_REVISION_RECORDING: ', ROUTINE_REVISION_RECORDING);

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
  border: none;
  border-radius: 4px;
`;

const SetGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  border: none;
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
  }
  if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  console.log('data: ', data);

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
            let setGroupRecording;
            if (
              data.routineRevisionRecording &&
              data.routineRevisionRecording.setGroupRecordings
            ) {
              data.routineRevisionRecording.setGroupRecordings.forEach(
                setGroupRecording2 => {
                  if (
                    setGroupRecording2.setGroup.id ==
                    setGroupPlacement.setGroup.id
                  ) {
                    setGroupRecording = setGroupRecording2;
                  }
                },
              );
            }

            if (i === data.routineRevisionRecording.completedSetGroups) {
              console.log('found an active set group.');
              if (
                data.routineRevisionRecording &&
                data.routineRevisionRecording.setGroupRecordings
              ) {
                data.routineRevisionRecording.setGroupRecordings.forEach(
                  setGroupRecording2 => {
                    console.log('WHOAOHOAHOAHOAHO');
                    console.log('setGroupRecording: ', setGroupRecording2);
                    console.log('setGroupPlacement: ', setGroupPlacement);
                  },
                );
              }
              return (
                <ActiveSetGroup
                  key={`${i}activeSetGroup`}
                  setGroup={setGroupPlacement.setGroup}
                  setGroupRecording={setGroupRecording}
                  routineRevisionRecordingId={data.routineRevisionRecording.id}
                />
              );
            }
            const { setGroup } = setGroupPlacement;
            return (
              <SetGroupOuterContainer key={`${i}inactiveSetGroup`}>
                <SetGroupContainer>
                  {setGroup.exercises.map((exercise, j) => (
                    <SetContainer key={`${j}exercise`}>
                      {exercise.name}
                    </SetContainer>
                  ))}
                </SetGroupContainer>
                <NumSetsContainer>
                  {` - x${setGroup.defaultNumSets}`}
                </NumSetsContainer>
              </SetGroupOuterContainer>
            );
          },
        )}
      </RoutineSetGroups>
    </RoutineRecordingContainer>
  );
}

RoutineRevisionRecording.propTypes = {};

export default RoutineRevisionRecording;
