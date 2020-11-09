/**
 *
 * RoutineRecordingListItem
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

const SmallRoutineLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  font-size: 14px;
`;

const DescriptionBlock = styled.div`
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

function RoutineRecordingListItem(props) {
  const { recording } = props;
  const date = new Date(parseInt(recording.createdAt));
  return (
    <RoutineContainer key={recording.id}>
      <RoutineLink to={`/recording/${recording.id}`}>Recording of {recording.routineRevision.routine.name}</RoutineLink>
      <SmallRoutineLink to={`/recording/${recording.id}`}>{date.toDateString() + " - " + date.toLocaleTimeString()}</SmallRoutineLink>
      <DescriptionBlock>{recording.routineRevision.routine.description}</DescriptionBlock>
      <ExerciseListContainer>
        {recording.routineRevision.setGroupPlacements.map(
          setGroupPlacement => {
            return setGroupPlacement.setGroup.exercises.map(exercise => {
              return <ExerciseContainer>{exercise.name}</ExerciseContainer>;
            });
          },
        )}
      </ExerciseListContainer>
    </RoutineContainer>
  );
}

RoutineRecordingListItem.propTypes = {};

export default RoutineRecordingListItem;
