/**
 *
 * ExerciseFeed
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useQuery, gql } from '@apollo/client';
// import EXERCISES from '../../graphql/queries/EXERCISES';

const EXERCISES = gql`
  query EXERCISES {
    exercises {
      name
      id
      description
      format {
        name
      }
    }
  }
`;

const ExerciseContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
`;

function ExerciseFeed() {
  const { loading, error, data } = useQuery(EXERCISES);
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  console.log('data: ', data);
  return (
    <div>
      {data.exercises.map(exercise => {
        return (
          <ExerciseContainer key={exercise.id}>
            <table>
              <tr>
                <td>Name:</td>
                <td>{exercise.name}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{exercise.description}</td>
              </tr>
              <tr>
                <td>Format:</td>
                <td>{exercise.format.name}</td>
              </tr>
            </table>
          </ExerciseContainer>
        );
      })}
    </div>
  );
}

ExerciseFeed.propTypes = {};

export default ExerciseFeed;
