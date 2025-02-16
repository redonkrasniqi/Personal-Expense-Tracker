import express from 'express';
import { getCurrencies } from '../controllers/currencyController';

const router = express.Router();

router.post('/', getCurrencies);

export default router;
