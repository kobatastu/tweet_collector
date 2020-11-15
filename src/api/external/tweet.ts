import { Request, Response } from 'express';

import { isRequestQuery } from './type';

export const get = async (req: Request, res: Response) => {
  if (!isRequestQuery(req.query)) {
    res.status.json({ error: 'query is not correct type' });
  }
  const { year, month, date } = req.query;
  res.status(200).json({});
};
