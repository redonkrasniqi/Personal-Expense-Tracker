import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: { id: string; email: string; name: string };
}

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        console.log(`User ${user.id} just logged in!`);

        res.json({ token, user });
    } catch (error: any) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName, currencyId } = req.body;
        console.log("request body: ", req.body)

        if (!email || !password || !fullName || !currencyId) {
            res.status(400).json({ message: 'Email, password, full name and currency are required' });
            return;
        }

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
                name: fullName,
                currencyId
            }
        });

        const token = generateToken(user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjusted
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        console.log(`User ${user.id} just registered!`);
        
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.cookie('jwt', '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0 });
        res.json({ message: 'Logged out successfully' });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return
    }
};

export const getAuthUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            res.json({ id: null });
            return
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            res.json({ id: null });
            return
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
