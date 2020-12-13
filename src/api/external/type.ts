type TrendQueryType = {
  year: string;
  month: string;
  date: string;
  hour: string;
};

type TweetBodyType = {
  year: number;
  month: number;
  date: number;
  hour: number;
  tweetWord: string;
};

export const isTrendRequestQuery = (obj: unknown): obj is TrendQueryType => {
  try {
    const t = obj as TrendQueryType;
    const { year, month, date, hour } = t;
    if (
      typeof year === 'string' &&
      typeof month === 'string' &&
      typeof date === 'string' &&
      typeof hour === 'string'
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const isTweetRequestBody = (obj: unknown): obj is TweetBodyType => {
  try {
    const t = obj as TweetBodyType;
    const { year, month, date, hour, tweetWord } = t;
    if (
      typeof year === 'number' &&
      typeof month === 'number' &&
      typeof date === 'number' &&
      typeof hour === 'number' &&
      typeof tweetWord === 'string'
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
