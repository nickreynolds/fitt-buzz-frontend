/**
 *
 * CreateExercise
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
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

const CreateMuscleMutation = gql`
  mutation($name: String!, $description: String!) {
    createMuscle(name: $name, description: $description) {
      id
    }
  }
`;

function CreateMuscle() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createMuscle, { data }] = useMutation(CreateMuscleMutation);
  const intl = useIntl();

  // intl.formatMessage({ ...messages.name });
  console.log('intl: ', intl);

  return (
    <div>
      <CreateMuscleForm
        onSubmit={async e => {
          e.preventDefault();
          setErrorMessage('');
          try {
            const result = await createMuscle({
              variables: { name, description },
            });
            setName('');
            setDescription('');
            setErrorMessage('');
          } catch (ex) {
            setErrorMessage(ex);
          }
        }}
      >
        <NameInput
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          placeholder={intl.formatMessage({ ...messages.name })}
        />
        <DescriptionInput
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
          placeholder={intl.formatMessage({ ...messages.description })}
        />
        {errorMessage && <span>{errorMessage}</span>}
        <button>{intl.formatMessage({ ...messages.submit })}</button>
      </CreateMuscleForm>
    </div>
  );
}

CreateMuscle.propTypes = {};

export default memo(CreateMuscle);
