import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../services/authService';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjusted
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name: fullName
            }
        });

        const token = generateToken(user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjusted
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
        });

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};