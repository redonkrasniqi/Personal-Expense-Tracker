import express from 'express';
import { login, register, logout, getAuthUser } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', authenticateJWT, getAuthUser);

export default router;
