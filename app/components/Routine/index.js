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
const ROUTINE = gql`
  query ROUTINE($routineId: String!) {
    routine(id: $routineId) {
      name
      id
      description
      revisions {
        id
        setGroups {
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
`;

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: blue;
  color: white;
  font-size: 14px;
  padding: 4px 4px 4px 4px;
  border-radius: 3px;
`;

const RoutineSetGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

const SetGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: 1px solid;
  border-radius: 4px;
`;

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
            Clone Me
          </CloneButton>
        </CloneButtonContainer>
      </RoutineHeader>
      {errorText && <span>{errorText}</span>}
      <RoutineSetGroups>
        {data.routine.revisions[revisionIndex].setGroups.map(setGroup => {
          console.log('setGroup: ', setGroup);
          return (
            <SetGroupContainer>
              {setGroup.exercises.map(exercise => {
                return <>{exercise.name}</>;
              })}
              <>{' - x' + setGroup.defaultNumSets}</>
            </SetGroupContainer>
          );
        })}
      </RoutineSetGroups>
    </RoutineContainer>
  );
}

Routine.propTypes = {
  routineId: String,
};

export default Routine;
