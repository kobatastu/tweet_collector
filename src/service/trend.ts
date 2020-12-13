import { getFirestoreTrend } from '../infra/firestore';
import { getTrend } from '../infra/twetterAPI';

export const trendByTime = async (year: number, month: number, date: number, hour: number) => {
  const trend = await getFirestoreTrend(year, month, date, hour);
  return trend;
};

export const trend = async () => {
  const trend = await getTrend();
  if (!trend && trend.length < 21) return null;
  return trend.slice(0, 19);
};
