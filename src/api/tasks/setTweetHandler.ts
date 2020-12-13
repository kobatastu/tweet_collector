import { Request, Response } from 'express';

import { isRequestBody } from './type';
import { tweet } from '../../service/tweet';

export const setTweetHandler = async (req: Request, res: Response) => {
  if (!isRequestBody(req.body)) {
    res.status(400).json({ error: 'body is not correct type' });
    return;
  }

  const { tweetWord } = req.body;

  try {
    await tweet(tweetWord);
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ error: 'Cannot set the tweet' });
  }
};
