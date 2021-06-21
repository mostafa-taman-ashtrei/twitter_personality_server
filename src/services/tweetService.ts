import Twitter from 'twitter';
import PersonalityInsightsV3 from 'ibm-watson/personality-insights/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

import { twitterKeys, watsonKeys } from '../config/keys';
import { Analysis } from '../types';

const T = new Twitter(twitterKeys);

const personalityInsights = new PersonalityInsightsV3({
    authenticator: new IamAuthenticator({ apikey: watsonKeys.apikey }),
    version: '2017-10-13',
    serviceUrl: watsonKeys.url,
});

export const getTweets = (username: string): Promise<string[]> => new Promise((resolve, reject) => {
    T.get('statuses/user_timeline', { screen_name: username, count: 100 }, (error, tweets, response) => {
        if (error) return reject(error);
        if (!tweets) return reject(new Error('A Server Error Occured'));
        if (response.statusCode === 404) return reject(new Error('Invalid username'));

        const tweetsText: string[] = [];
        tweets.map((tweet: any) => tweetsText.push(tweet.text));
        return resolve(tweetsText);
    });
});

export const analyize = async (username: string) => {
    const tweets = await getTweets(username);
    const joinedTweets = tweets.join();
    const Finaldata: Analysis[] = [];

    try {
        const data = await personalityInsights.profile({
            content: joinedTweets,
            contentType: 'text/plain',
            consumptionPreferences: true,
        });

        data.result.personality.map((p) => Finaldata.push(
            { name: p.name, value: Math.floor(p.percentile * 100) },
        ));
        data.result.needs.map((n) => Finaldata.push(
            { name: n.name, value: Math.floor(n.percentile * 100) },
        ));

        console.log(Finaldata);
        return Finaldata;
    } catch (e) {
        throw new Error(e);
    }
};
