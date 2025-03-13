import express from 'express';
import { 
    createTransaction,
    getAllTransactions,
    deleteTransaction,
    getTransactionById,
    updateTransaction,
    getTransactionsByCategory,
    getTransactionsByDateRange,
    getMonthlyTransactionSummary
} from '../controllers';
import { authenticateJWT } from '../middlewares';

const router = express.Router();

router.post('/create', authenticateJWT, createTransaction);
router.post('/:id', authenticateJWT, deleteTransaction);
router.get('/', authenticateJWT, getAllTransactions);
router.get('/:id', authenticateJWT, getTransactionById);
router.put('/update/:id', authenticateJWT, updateTransaction);
router.get('/category/:category', authenticateJWT, getTransactionsByCategory);
router.get('/date-range', authenticateJWT, getTransactionsByDateRange);
router.get('/summary/monthly', authenticateJWT, getMonthlyTransactionSummary);

export default router;
