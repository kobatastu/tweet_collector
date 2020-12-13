import promiseRouter from 'express-promise-router';

const router = promiseRouter();

router.post('/api/cron/tweet', require('../api/cron/tweet').post);

export const cronRouter = router;
