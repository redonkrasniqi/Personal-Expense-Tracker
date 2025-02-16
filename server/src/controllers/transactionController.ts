import { Request, Response } from 'express';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, description, category } = req.body;

        if (!amount) {
            res.status(400).json({ message: 'Transaction amount is required' });
        }

        console.log("the request body: ", req.body)
        return
    } catch (error) {
        console.error('Error creating a transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
