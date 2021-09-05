import express, { Router } from 'express';
import { resolve } from 'path';

import apiRouter from './api';

const router = Router();

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  router.use(express.static(resolve(__dirname, 'app')));
  router.get(/^(((?!\/?api).*)|(\/))$/, (_req, res) => res.sendFile(resolve(__dirname, 'app', 'index.html')));
}

export default router;
