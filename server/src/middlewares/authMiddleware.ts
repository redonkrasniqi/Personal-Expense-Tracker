import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare module 'express' {
  interface Request {
    user?: { id: string };
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    
    const token = req.cookies?.jwt;
    
    if (!token) {
        res.json({ id: null });
        return;
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

