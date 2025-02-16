import express from 'express';
import { createTransaction } from '../controllers/transactionController';

const router = express.Router();

router.post('/create', createTransaction);
// router.post('/delete', deleteTransaction);
// router.get('/all', getAllTransactions);
// router.get('/:id', getTransactionById);
// router.put('/update/:id', updateTransaction);
// router.get('/category/:category', getTransactionsByCategory);
// router.get('/date-range', getTransactionsByDateRange);
// router.get('/summary/monthly', getMonthlyTransactionSummary);

export default router;
