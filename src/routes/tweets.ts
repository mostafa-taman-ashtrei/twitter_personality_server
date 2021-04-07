import { Router, Response, Request } from 'express';
import { analyize } from '../services/tweetService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const data = await analyize(username);
        return res.json({ data });
    } catch (e) {
        return res.status(500).json({ msg: 'Server Error' });
    }
});

export default router;
