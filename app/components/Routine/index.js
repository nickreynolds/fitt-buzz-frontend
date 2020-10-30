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
import CloneRoutineAtRevision from '../../graphql/mutations/CloneRoutine';
import { colors } from '../../utils/constants';
const ROUTINE = gql`
  query ROUTINE($routineId: String!) {
    routine(id: $routineId) {
      name
      id
      description
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

const CloneButtonContainer = styled.div`
  padding: 10px 10px 10px 10px;
`;

const CloneButton = styled.button`
  background-color: ${colors.popElement1};
  color: white;
  font-size: 14px;
  padding: 4px 4px 4px 4px;
  border-radius: 3px;
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

function Routine({ routineId }) {
  const [errorText, setErrorText] = useState('');
  const [cloneRoutineAtRevision, { data2 }] = useMutation(
    CloneRoutineAtRevision,
  );
  const { loading, error, data } = useQuery(ROUTINE, {
    variables: { routineId },
  });
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  const numRevisions = data.routine.revisions.length;
  const revisionId = data.routine.revisions[numRevisions - 1].id;
  const revisionIndex = numRevisions - 1;
  console.log('revisionId: ', revisionId);
  return (
    <RoutineContainer>
      <RoutineHeader>
        <>Name: {data.routine.name}</>
        <CloneButtonContainer>
          <CloneButton
            onClick={async e => {
              e.preventDefault();
              try {
                const result = await cloneRoutineAtRevision({
                  variables: { routineId, revisionId },
                });
                console.log('result: ', result);
              } catch (ex) {
                setErrorText(ex);
              }
            }}
          >
            Add to My Routines
          </CloneButton>
        </CloneButtonContainer>
      </RoutineHeader>
      {errorText && <span>{errorText}</span>}
      <RoutineSetGroups>
        {data.routine.revisions[revisionIndex].setGroupPlacements.map(
          setGroupPlacement => {
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
          },
        )}
      </RoutineSetGroups>
    </RoutineContainer>
  );
}

Routine.propTypes = {
  routineId: String,
};

export default Routine;
