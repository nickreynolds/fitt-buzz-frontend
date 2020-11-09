/**
 *
 * Asynchronously loads the component for MyHistoryFeed
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
