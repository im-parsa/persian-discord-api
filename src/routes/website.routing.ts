import express from 'express';
import { main, user } from '../controllers/website.controller';

const router = express.Router();


router.get('/', main);

router.get('/user', user);


export const websiteRouter = router;
