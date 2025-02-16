import { Request, Response } from "express";

export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        console.error('Error getting currencies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}