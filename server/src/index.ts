import express from 'express';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import currencyRoutes from './routes/currencyRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(
  cors({ 
    origin: 'http://localhost:3000',
    credentials: true  
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/currency', currencyRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));