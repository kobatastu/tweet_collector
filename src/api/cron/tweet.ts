import { Request, Response } from 'express';

import { getTrend } from '../../infra/twetterAPI';
import { enqueueTask } from '../../infra/cloudTasks';

export const post = async (req: Request, res: Response) => {
  const trends = await getTrend();

  await Promise.all(
    trends.map((trend) =>
      enqueueTask({
        queue: 'setEachTrendTwitterWord',
        data: {
          trend,
        },
      })
    )
  );

  res.status(200).json({});
};
