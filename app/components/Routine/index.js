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
import { Redirect } from 'react-router-dom';
import useLocalStorage from '@rehooks/local-storage';
import messages from './messages';
import CloneRoutineAtRevision from '../../graphql/mutations/CloneRoutine';
import StartRoutineRevisionRecording from '../../graphql/mutations/StartRoutineRevisionRecording';
import { colors } from '../../utils/constants';
const ROUTINE = gql`
  query ROUTINE($routineId: String!) {
    routine(id: $routineId) {
      name
      id
      description
      createdBy {
        id
      }
      revisions {
        id
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

const RoutineContainer = styled.div`
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

function Routine({ routineId }) {
  const [errorText, setErrorText] = useState('');
  const [cloneRoutineAtRevision, { data2 }] = useMutation(
    CloneRoutineAtRevision,
  );
  const [startRoutineRevisionRecording, { data3 }] = useMutation(
    StartRoutineRevisionRecording,
  );
  const [newRoutineId, setNewRoutineId] = useState('');
  const [newRecordingId, setNewRecordingId] = useState('');
  const [userId] = useLocalStorage('userId');
  // console.log('token: ', token);
  const { loading, error, data } = useQuery(ROUTINE, {
    variables: { routineId },
  });

  if (loading) {
    return <></>;
  }
  if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }

  const currentUserIsOwner = userId === data.routine.createdBy.id;
  const numRevisions = data.routine.revisions.length;
  const revisionId = data.routine.revisions[numRevisions - 1].id;
  const revisionIndex = numRevisions - 1;
  return (
    <RoutineContainer>
      <RoutineHeader>
        <>Name: {data.routine.name}</>
        {!currentUserIsOwner && (
          <ButtonContainer>
            <Button
              onClick={async e => {
                e.preventDefault();
                try {
                  const result = await cloneRoutineAtRevision({
                    variables: { routineId, revisionId },
                  });
                  console.log('result: ', result);

                  const newRoutineId = result.data.cloneRoutineAtRevision.id;
                  setNewRoutineId(newRoutineId);
                } catch (ex) {
                  setErrorText(ex);
                }
              }}
            >
              Add to My Routines
            </Button>
          </ButtonContainer>
        )}
        {currentUserIsOwner && (
          <ButtonContainer>
            <Button
              onClick={async e => {
                e.preventDefault();
                try {
                  console.log('start recording 1');
                  console.log('routineId: ', routineId);
                  console.log('revisionId: ', revisionId);
                  const result = await startRoutineRevisionRecording({
                    variables: { routineId, revisionId },
                  });
                  console.log('start recording 2');
                  console.log('result: ', result);

                  const newRecordingId =
                    result.data.startRoutineRevisionRecording;
                  setNewRecordingId(newRecordingId);
                } catch (ex) {
                  setErrorText(ex);
                }
              }}
            >
              Start Routine
            </Button>
          </ButtonContainer>
        )}
      </RoutineHeader>
      {errorText && <span>{`${errorText}`}</span>}
      <RoutineSetGroups>
        {data.routine.revisions[revisionIndex].setGroupPlacements.map(
          setGroupPlacement => {
            const { setGroup } = setGroupPlacement;
            // console.log('setGroup: ', setGroup);
            return (
              <SetGroupOuterContainer>
                <SetGroupContainer>
                  {setGroup.exercises.map(exercise => (
                    <SetContainer>{exercise.name}</SetContainer>
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
      {newRoutineId && <Redirect to={`/routine/${newRoutineId}`} />}
      {newRecordingId && <Redirect to={`/recording/${newRecordingId}`} />}
    </RoutineContainer>
  );
}

Routine.propTypes = {
  routineId: String,
};

export default Routine;
