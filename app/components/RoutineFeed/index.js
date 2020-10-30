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
import RoutineListItem from '../RoutineListItem';
// import EXERCISES from '../../graphql/queries/EXERCISES';

const ROUTINES = gql`
  query ROUTINES {
    feed {
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

        return <RoutineListItem routine={routine} />;
      })}
    </div>
  );
}

RoutineFeed.propTypes = {};

export default RoutineFeed;
