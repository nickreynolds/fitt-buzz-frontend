/*
 * CreateExercise Messages
 *
 * This contains all the text for the CreateExercise component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CreateExercise';

export default defineMessages({
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  format: {
    id: `${scope}.format`,
    defaultMessage: 'Format',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'submit',
  },
});
