/**
 *
 * MyHistoryFeed
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import RoutineRecordingListItem from '../RoutineRecordingListItem';
// import EXERCISES from '../../graphql/queries/EXERCISES';

const MY_ROUTINE_RECORDINGS = gql`
  query MY_ROUTINE_RECORDINGS {
    myRoutineRecordings {
      id
      createdAt
      routineRevision {
        id
        routine {
          name
          id
          description
        }
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

function MyHistoryFeed() {
  const { loading, error, data } = useQuery(MY_ROUTINE_RECORDINGS);
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  return (
    <div>
      {data.myRoutineRecordings.map(recording => {
        return <RoutineRecordingListItem recording={recording} />;
      })}
    </div>
  );
}

MyHistoryFeed.propTypes = {};

export default MyHistoryFeed;
