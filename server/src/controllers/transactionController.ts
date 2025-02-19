import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, description, category, date, paymentMethod } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        if (!amount || !description || !date ) {
            res.status(400).json({ message: 'Transaction amount, description and date is required' });
            return;
        }

        const defaultCategoryId = 'cm7cglhgm000008jj5n64clnk'; // "Others" category id

        const transaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                userId,
                categoryId: category ? category : defaultCategoryId,
                date,
                paymentMethod
            }
        })

        console.log("Transaction Created: ", transaction)

        res.status(200).json({ message: 'Transaction created successfully!'})
        return;
    } catch (error) {
        console.error('Error creating a transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Transaction ID is required for deleting transaction' });
        }

        console.log("the request body: ", req.body)
        return
    } catch (error) {
        console.error('Error deleting a transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllTransactions = async(req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const transactions = await prisma.transaction.findMany({
            select: {
                id: true,
                amount: true,
                date: true,
                description: true,
                paymentMethod: true,
                category: true,
                createdAt: true
            },
            where: {
                userId: userId
            }
        })

        console.log("get all transactions results: ", transactions)

        res.json(transactions)
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
