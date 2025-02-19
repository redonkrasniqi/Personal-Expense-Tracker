import express from 'express';
import { createTransaction, getAllTransactions } from '../controllers/transactionController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create', authenticateJWT, createTransaction);
// router.post('/delete', deleteTransaction);
router.get('/', authenticateJWT, getAllTransactions);
// router.get('/:id', getTransactionById);
// router.put('/update/:id', updateTransaction);
// router.get('/category/:category', getTransactionsByCategory);
// router.get('/date-range', getTransactionsByDateRange);
// router.get('/summary/monthly', getMonthlyTransactionSummary);

export default router;
