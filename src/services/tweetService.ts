/* eslint-disable import/prefer-default-export */
import Twitter from 'twitter';
import twitterKeys from '../config/twitterKeys';

const T = new Twitter(twitterKeys);

export const getTweets = (username: string): Promise<string[]> => new Promise((resolve, reject) => {
    T.get('statuses/user_timeline', { screen_name: username, count: 100 }, (error, tweets, response) => {
        if (error) reject(error);
        if (response.statusCode === 404) reject(new Error('Invalid username'));

        const tweetsText: string[] = [];
        tweets.map((tweet: any) => tweetsText.push(tweet.text));
        return resolve(tweetsText);
    });
});

export const analyize = async (username: string) => {
    const tweets = await getTweets(username);
    const joinedTweets = tweets.join();
    return joinedTweets;
};
