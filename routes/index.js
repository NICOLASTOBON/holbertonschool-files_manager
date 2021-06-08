import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

router.use('/status', AppController.getStatus);
router.use('/stats', AppController.getStats);

export default router;
