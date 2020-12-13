import { initializeApp, firestore } from 'firebase-admin';

import { TrendTweet, isTrend, isTrendTweet } from './type';

const app = initializeApp();

export const setTrend = async (
  year: number,
  month: number,
  date: number,
  hour: number,
  trend: string[]
) => {
  await app
    .firestore()
    .collection('twitter_trend')
    .doc(`${year}_${month}_${date}_${hour}`)
    .set({
      created_at: firestore.Timestamp.fromDate(new Date()),
      year,
      month,
      date,
      hour,
      trend,
    });
};

export const setTweet = async (
  year: number,
  month: number,
  date: number,
  hour: number,
  tweetWord: string,
  tweetText: string[]
) => {
  await app
    .firestore()
    .collection('twitter_trend_tweet')
    .doc()
    .set({
      created_at: firestore.Timestamp.fromDate(new Date()),
      year,
      month,
      date,
      hour,
      tweetWord,
      tweetText,
    });
};

export const getFirestoreTrend = async (
  year: number,
  month: number,
  date: number,
  hour: number
) => {
  const docSnapshot = await app
    .firestore()
    .collection('twitter_trend')
    .doc(`${year}_${month}_${date}_${hour}`)
    .get();

  if (!docSnapshot.exists) return null;
  if (!isTrend(docSnapshot.data())) return null;

  return docSnapshot.data();
};

export const getFirestoreTweet = async (
  year: number,
  month: number,
  date: number,
  hour: number,
  tweetWord: string
) => {
  const querySnapshot = await app
    .firestore()
    .collection('twitter_trend_tweet')
    .where('year', '==', year)
    .where('month', '==', month)
    .where('date', '==', date)
    .where('hour', '==', hour)
    .where('tweetWord', '==', tweetWord)
    .get();

  if (querySnapshot.empty) return null;

  return querySnapshot.docs
    .map((doc) => doc.data())
    .filter((data): data is TrendTweet => isTrendTweet(data));
};
