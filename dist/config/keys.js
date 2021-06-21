"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watsonKeys = exports.twitterKeys = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.twitterKeys = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};
exports.watsonKeys = {
    apikey: process.env.WATSON_KEY,
    url: process.env.WATSON_URL,
};
//# sourceMappingURL=keys.js.map