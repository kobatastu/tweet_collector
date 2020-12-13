import config from 'config';

const { CloudTasksClient } = require('@google-cloud/tasks');

type Queue = 'setEachTrendTwitterWord';
type Task = { queue: Queue; data: { trend: string } };
type DefinedQueue = { queueName: string; uri: string };
type CreateTaskResponse = { name: string }[];

const PROJECT_ID = config.get<string>('TASKS.PROJECT_ID');
const LOCATION = config.get<string>('TASKS.LOCATION');
const URL = config.get<string>('TASKS.URL');

const definedQueues: { [key in Queue]: DefinedQueue } = {
  setEachTrendTwitterWord: {
    queueName: 'set-each-trend-twitter-word',
    uri: `${URL}/api/tasks/setTweetHandler`,
  },
};

export const enqueueTask = (task: Task): Promise<CreateTaskResponse> => {
  const client = new CloudTasksClient();
  const { queueName, uri } = definedQueues[task.queue];
  const parent = client.queuePath(PROJECT_ID, LOCATION, queueName);
  const wrappedTask = {
    httpRequest: {
      httpMethod: 'POST',
      url: uri,
      headers: {
        'Content-Type': 'application/json',
      },
      body: Buffer.from(JSON.stringify(task.data)),
    },
  };
  const request = { task: wrappedTask, parent };
  return client.createTask(request);
};
