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
import RoutineListItem from '../RoutineListItem';
// import EXERCISES from '../../graphql/queries/EXERCISES';

const MY_ROUTINES = gql`
  query MY_ROUTINES {
    myRoutines {
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

function MyRoutinesFeed() {
  const { loading, error, data } = useQuery(MY_ROUTINES);
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  return (
    <div>
      {data.myRoutines.map(routine => {
        const revision = routine.revisions[0];

        return <RoutineListItem routine={routine} />;
      })}
    </div>
  );
}

MyRoutinesFeed.propTypes = {};

export default MyRoutinesFeed;
