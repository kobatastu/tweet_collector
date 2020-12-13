type BodyType = {
  tweetWord: string;
};

export const isRequestBody = (obj: unknown): obj is BodyType => {
  try {
    const t = obj as BodyType;
    const { tweetWord } = t;
    if (typeof tweetWord === 'string') {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
