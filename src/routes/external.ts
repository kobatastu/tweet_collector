import promiseRouter from 'express-promise-router';

const router = promiseRouter();

router.get('api/external/tweet', require('../api/external/tweet').get);

export const externalRouter = router;
