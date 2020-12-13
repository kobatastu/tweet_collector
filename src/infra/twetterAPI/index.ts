import Twitter from 'twitter';
import config from 'config';

import { isTrend, isTweet } from './type';

const client = new Twitter({
  consumer_key: config.get<string>('TWITTER.consumer_key'),
  consumer_secret: config.get<string>('TWITTER.consumer_secret'),
  access_token_key: config.get<string>('TWITTER.access_token_key'),
  access_token_secret: config.get<string>('TWITTER.access_token_secret'),
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

// export const getTweet = (word: string) => {
//   const params = { q: word };
//   const searchedTweets = { tweetWord: word, tweetTextArray: [] };
//   client.get('search/tweets', params, (error, tweets) => {
//     if (error) throw new Error(`runtime: ${error}`);
//     if (tweets.statuses.length === 0) return null;
//     tweets.statuses.map((tweet) => searchedTweets.tweetTextArray.push(tweet.text));
//     if (searchedTweets.tweetTextArray.length === 0) return null;
//     return searchedTweets;
//   });
// };

// export const getTrend = () => {
//   const searchedTrends = [];
//   client.get('trends/place.json', regionId, (error, tweets) => {
//     if (error) throw new Error(`runtime: ${error}`);
//     if (tweets.length === 0 || tweets[0].trends.length === 0) return null;
//     tweets[0].trends.map((trend) => searchedTrends.push(trend.name));
//     if (searchedTrends.length === 0) return null;
//     return searchedTrends;
//   });
// };
