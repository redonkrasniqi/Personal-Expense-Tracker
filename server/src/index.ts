import express from 'express';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  )
});

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));