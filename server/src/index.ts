import express from 'express';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
