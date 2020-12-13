import Twitter from 'twitter';
import config from 'config';

import { isTrend, isTweet } from './type';

const client = new Twitter({
  consumer_key: config.get<string>('TWITTER.CONSUMER_KEY'),
  consumer_secret: config.get<string>('TWITTER.CONSUMER_SECRET'),
  access_token_key: config.get<string>('TWITTER.ACCESS_TOKEN_KEY'),
  access_token_secret: config.get<string>('TWITTER.ACCESS_TOKEN_SECRET'),
});

const twitterPromise = (requestPath: string, params: { id: number } | { q: string }) => {
  return new Promise((resolve, reject) => {
    client.get(requestPath, params, (error, tweets) => {
      if (error) {
        reject(error);
      } else {
        resolve(tweets);
      }
    });
  });
};

export const getTrend = async () => {
  const regionId = { id: 23424856 };
  const result = await twitterPromise('trends/place.json', regionId).then(
    (tweets) => {
      const searchedTrends = [];
      if (!isTrend(tweets)) return null;
      tweets[0].trends.map((trend) => searchedTrends.push(trend.name));
      if (searchedTrends.length === 0) return null;
      return searchedTrends;
    },
    (error) => {
      throw new Error(`runtime: ${error}`);
    }
  );
  return result;
};

export const getTweet = async (word: string) => {
  const params = { q: word };
  const result = await twitterPromise('search/tweets', params).then(
    (tweets) => {
      const searchedTweets = { tweetWord: word, tweetTextArray: [] };
      if (!isTweet(tweets)) return null;
      tweets.statuses.map((tweet) => searchedTweets.tweetTextArray.push(tweet.text));
      if (searchedTweets.tweetTextArray.length === 0) return null;
      return searchedTweets;
    },
    (error) => {
      throw new Error(`runtime: ${error}`);
    }
  );
  return result;
};
