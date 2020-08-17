/**
 *
 * Asynchronously loads the component for Routine
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
