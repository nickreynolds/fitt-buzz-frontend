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

const CreateExerciseForm = styled.form`
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

const FormatInput = styled.input`
  height: 40px;
  padding: 2px;
  line-height: 36px;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const CreateExerciseMutation = gql`
  mutation($name: String!, $description: String!, $format: String!) {
    createExercise(name: $name, description: $description, format: $format) {
      id
    }
  }
`;

function CreateExercise() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createExercise, { data }] = useMutation(CreateExerciseMutation);
  const intl = useIntl();

  // intl.formatMessage({ ...messages.name });
  console.log('intl: ', intl);

  return (
    <div>
      <CreateExerciseForm
        onSubmit={async e => {
          e.preventDefault();
          setErrorMessage('');
          try {
            const result = await createExercise({
              variables: { name, description, format },
            });
            setName('');
            setDescription('');
            setErrorMessage('');
            setFormat('');
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
        <FormatInput
          value={format}
          onChange={e => {
            setFormat(e.target.value);
          }}
          placeholder={intl.formatMessage({ ...messages.format })}
        />
        {errorMessage && <span>{errorMessage}</span>}
        <button>{intl.formatMessage({ ...messages.submit })}</button>
      </CreateExerciseForm>
    </div>
  );
}

CreateExercise.propTypes = {};

export default memo(CreateExercise);
