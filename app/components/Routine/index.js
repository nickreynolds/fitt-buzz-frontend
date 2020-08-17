/**
 *
 * Routine
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useQuery, gql } from '@apollo/client';

const ROUTINE = gql`
  query ROUTINE($routineId: String!) {
    routine(id: $routineId) {
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

function Routine({ routineId }) {
  const { loading, error, data } = useQuery(ROUTINE, {
    variables: { routineId },
  });
  if (loading) {
    return <></>;
  } else if (error) {
    console.log('error: ', error);
    return <span>{error}</span>;
  }
  return (
    <div>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{data.routine.name}</td>
        </tr>
      </tbody>
    </div>
  );
}

Routine.propTypes = {
  routineId: String,
};

export default Routine;
