import express from 'express';
const router = express.Router();

import { getAllMessages } from '../controllers/messageController';

router.get('/', getAllMessages);

export const messageRoutes = router;