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
import { Link } from 'react-router-dom';
// import EXERCISES from '../../graphql/queries/EXERCISES';

const ROUTINES = gql`
  query ROUTINES {
    feed {
      name
      id
      description
      revisions {
        setGroups {
          exercises {
            name
            id
            description
            format {
              name
            }
          }
        }
      }
    }
  }
`;

const RoutineContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
`;

const ExerciseListContainer = styled.td`
  display: flex;
`;

const ExerciseContainer = styled.div`
  color: white;
  background-color: gray;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 2px 2px 2px;
  margin: 2px 2px 2px 2px;
`;
function RoutineFeed() {
  const { loading, error, data } = useQuery(ROUTINES);
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  return (
    <div>
      {data.feed.map(routine => {
        const revision = routine.revisions[0];

        return (
          <RoutineContainer key={routine.id}>
            <table>
              <tr>
                <td>Name:</td>
                <td>
                  <Link to={`/routine/${routine.id}`}>{routine.name}</Link>
                </td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{routine.description}</td>
              </tr>
              <tr>
                <td>Exercises:</td>
                <ExerciseListContainer>
                  {routine.revisions[0].setGroups.map(setGroup => {
                    return (
                      <ExerciseContainer>
                        {setGroup.exercises[0].name}
                      </ExerciseContainer>
                    );
                  })}
                </ExerciseListContainer>
              </tr>
            </table>
          </RoutineContainer>
        );
      })}
    </div>
  );
}

RoutineFeed.propTypes = {};

export default RoutineFeed;
