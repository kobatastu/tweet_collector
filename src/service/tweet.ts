import { getFirestoreTweet, setTweet } from '../infra/firestore';
import { getTweet } from '../infra/twetterAPI';

export const tweetByTime = async (
  year: number,
  month: number,
  date: number,
  hour: number,
  tweetWord: string
) => {
  console.log(year, month, date, hour, tweetWord);
  const trend = await getFirestoreTweet(year, month, date, hour, tweetWord);
  console.log(trend);
  return trend;
};

export const tweet = async (tweetWord: string) => {
  const now = new Date();
  const { tweetTextArray } = await getTweet(tweetWord);
  console.log(tweetTextArray);
  if (tweetTextArray && tweetTextArray.length !== 0) {
    await setTweet(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      tweetWord,
      tweetTextArray
    );
  }
};
