import { Request, Response } from 'express';

import { isTweetRequestBody } from './type';
import { tweetByTime } from '../../service/tweet';

export const tweet = async (req: Request, res: Response) => {
  if (!isTweetRequestBody(req.body)) {
    res.status(400).json({ error: 'body is not correct type' });
    return;
  }
  const { year, month, date, hour, tweetWord } = req.body;
  const data = await tweetByTime(year, month, date, hour, tweetWord);
  res.status(200).json(data);
};
