import express from 'express';

import { getDiagnoses } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getDiagnoses();
  res.json(data);
});

export default router;
