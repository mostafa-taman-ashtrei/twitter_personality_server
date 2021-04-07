import { config } from 'dotenv';

config();

export const twitterKeys = {
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!,
    access_token_key: process.env.ACCESS_TOKEN_KEY!,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET!,
};

export const watsonKeys = {
    apikey: process.env.WATSON_KEY!,
    url: process.env.WATSON_URL!,
};
