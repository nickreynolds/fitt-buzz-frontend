/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Log in',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Sign up',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Log out',
  },
  createExercise: {
    id: `${scope}.createExercise`,
    defaultMessage: 'Create Exercise',
  },
});
