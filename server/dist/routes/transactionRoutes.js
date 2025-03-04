"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var transactionController_1 = require("../controllers/transactionController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
router.post('/create', authMiddleware_1.authenticateJWT, transactionController_1.createTransaction);
// router.post('/delete', deleteTransaction);
router.get('/', authMiddleware_1.authenticateJWT, transactionController_1.getAllTransactions);
// router.get('/:id', getTransactionById);
// router.put('/update/:id', updateTransaction);
// router.get('/category/:category', getTransactionsByCategory);
// router.get('/date-range', getTransactionsByDateRange);
// router.get('/summary/monthly', getMonthlyTransactionSummary);
exports.default = router;
