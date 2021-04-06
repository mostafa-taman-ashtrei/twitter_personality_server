import { Router, Response, Request } from 'express';
import { analyize } from '../services/tweetService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const tweets = await analyize(username);
        res.json({ tweets });
    } catch (e) {
        res.status(500).json({ msg: 'Server Error' });
        throw new Error(e);
    }
});

export default router;
