import { Request, Response } from 'express';

import { isTrendRequestQuery } from './type';
import { trendByTime } from '../../service/trend';

export const trend = async (req: Request, res: Response) => {
  if (!isTrendRequestQuery(req.query)) {
    res.status(400).json({ error: 'query is not correct type' });
    return;
  }
  const { year, month, date, hour } = req.query;
  const data = await trendByTime(Number(year), Number(month), Number(date), Number(hour));
  res.status(200).json(data);
};
