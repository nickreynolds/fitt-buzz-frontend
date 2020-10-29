/**
 *
 * RoutineListItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/constants';

const RoutineContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
  background-color: ${colors.secondaryBackground};
  color: white;
  padding: 8px;
  margin: 8px;
  display: flex;
  flex-direction: column;
`;

const ExerciseListContainer = styled.td`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExerciseContainer = styled.div`
  color: white;
  background-color: ${colors.popElement1};
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 2px 2px 2px;
  margin-right: 2px;
  margin-bottom: 2px;
`;

const RoutineLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  font-size: 20px;
`;

const DescriptionBlock = styled.div`
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

function RoutineListItem(props) {
  const { routine } = props;
  const numRevisions = routine.revisions.length;
  console.log('numRevisions: ', numRevisions);
  return (
    <RoutineContainer key={routine.id}>
      <RoutineLink to={`/routine/${routine.id}`}>{routine.name}</RoutineLink>
      <DescriptionBlock>{routine.description}</DescriptionBlock>
      <ExerciseListContainer>
        {routine.revisions[numRevisions - 1].setGroups.map(setGroup => {
          return setGroup.exercises.map(exercise => {
            return <ExerciseContainer>{exercise.name}</ExerciseContainer>;
          });
        })}
      </ExerciseListContainer>
    </RoutineContainer>
  );
}

RoutineListItem.propTypes = {};

export default RoutineListItem;
