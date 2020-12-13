export type TrendTweet = {
  year: number;
  month: number;
  date: number;
  hour: number;
  tweetText: string[];
  tweetWord: string;
};

export type Trend = {
  year: number;
  month: number;
  date: number;
  hour: number;
  trend: string[];
};

export const isTrendTweet = (obj: unknown): obj is TrendTweet => {
  try {
    const t = obj as TrendTweet;
    const { year, month, date, hour, tweetText, tweetWord } = t;
    if (
      typeof year === 'number' &&
      typeof month === 'number' &&
      typeof date === 'number' &&
      typeof hour === 'number' &&
      typeof tweetWord === 'string' &&
      tweetText.every((tweet) => typeof tweet === 'string')
    )
      return true;
    return false;
  } catch (e) {
    return false;
  }
};

export const isTrend = (obj: unknown): obj is Trend => {
  try {
    const t = obj as Trend;
    const { year, month, date, hour, trend } = t;
    if (
      typeof year === 'number' &&
      typeof month === 'number' &&
      typeof date === 'number' &&
      typeof hour === 'number' &&
      trend.every((value) => typeof value === 'string')
    )
      return true;
    return false;
  } catch (e) {
    return false;
  }
};
