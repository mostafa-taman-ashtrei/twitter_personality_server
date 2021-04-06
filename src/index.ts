import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';

import tweetsRoutes from './routes/tweets';

config();

(async () => {
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === 'production') {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
    } else {
        app.use(morgan('dev'));
    }

    app.use('/tweets', tweetsRoutes);

    app.listen(port, () => console.log(`Server is running on ${port} ...`));
})();
