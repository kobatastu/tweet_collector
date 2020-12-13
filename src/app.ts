import express from 'express';

import { externalRouter } from './routes/external';
import { cronRouter } from './routes/cron';
import { tasksRouter } from './routes/tasks';

const app = express();
const SERVER_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(externalRouter);
app.use(cronRouter);
app.use(tasksRouter);

app.listen(SERVER_PORT, () => {
  console.log(`server started at ${SERVER_PORT}`);
});
