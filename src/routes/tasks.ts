import promiseRouter from 'express-promise-router';

import { setTweetHandler } from '../api/tasks/setTweetHandler';

const router = promiseRouter();

router.post('/api/tasks/setTweetHandler', setTweetHandler);

export const tasksRouter = router;
