/**
 *
 * Asynchronously loads the component for RoutinePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
