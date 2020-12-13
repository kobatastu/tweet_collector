import promiseRouter from 'express-promise-router';

import { trend } from '../api/external/trend';
import { tweet } from '../api/external/tweet';

const router = promiseRouter();

router.get('/api/external/trend', trend);
router.post('/api/external/tweet', tweet);

export const externalRouter = router;
