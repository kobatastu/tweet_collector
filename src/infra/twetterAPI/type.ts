type Tweets = {
  statuses: {
    text: string;
  }[];
};

type Trends = {
  trends: {
    name: string;
  }[];
}[];

export const isTweet = (obj: unknown): obj is Tweets => {
  try {
    const tweets = obj as Tweets;
    const { statuses } = tweets;
    if (!statuses) return false;
    if (statuses.every((statuse) => typeof statuse.text === 'string')) return true;
    return false;
  } catch (e) {
    return false;
  }
};

export const isTrend = (obj: unknown): obj is Trends => {
  try {
    const trends = obj as Trends;
    return trends.every((trend) => {
      if (!trend || !trend.trends) return false;
      if (trend.trends.every((item) => typeof item.name === 'string')) return true;
      return false;
    });
  } catch (e) {
    return false;
  }
};
