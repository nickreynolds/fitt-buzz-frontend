/**
 *
 * Asynchronously loads the component for MyRoutinesFeed
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
