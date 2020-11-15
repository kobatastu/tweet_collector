import express from 'express';

import { externalRouter } from './routes/external';

const app = express();
const SERVER_PORT = process.env.PORT || 8080;

app.use(externalRouter);

app.listen(SERVER_PORT, () => {
  console.log(`server started at ${SERVER_PORT}`);
});
