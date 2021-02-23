/**
 *
 * CreateExercise
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import messages from './messages';

const CreateMuscleForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input`
  height: 40px;
  padding: 2px;
  line-height: 36px;
  margin-bottom: 6px;
`;

const DescriptionInput = styled.textarea`
  min-height: 180px;
  padding: 2px;
  line-height: 18px;
  resize: none;
  overflow: auto;
`;

const ALL_MUSCLES = gql`
  query MUSCLES {
    muscles {
      id
      name
      description
    }
  }
`;

function ViewMuscles() {
  const { loading, error, data } = useQuery(ALL_MUSCLES);
  if (loading) {
    return <></>;
  }
  if (error) {
    console.log('error: ', error);
    return <span>{error + ""}</span>;
  }
  console.log('data: ', data);
  const intl = useIntl();

  // intl.formatMessage({ ...messages.name });
  console.log('intl: ', intl);

  return (
    <div>
      <h2>Muscles</h2>
      {data.muscles.map((muscle) => {
        return (
          <div>
            <h5>{muscle.name}</h5>
            <p>{muscle.description}</p>
          </div>
        )
      })}
    </div>
  );
}

ViewMuscles.propTypes = {};

export default memo(ViewMuscles);
