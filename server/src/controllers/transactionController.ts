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
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            res.status(400).json({ message: 'Transaction ID is required for deleting transaction' });
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authorized' }); // changed to 401
        }

        await prisma.transaction.delete({
            where: {
                id,
                userId,
            },
        });

        res.status(204).send(); // Send 204 No Content for successful delete
    } catch (error) {
        console.error('Error deleting a transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

        res.json(transactions)
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            res.status(400).json({ message: 'Transaction ID is required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const transaction = await prisma.transaction.findUnique({
            where: {
                id,
                userId,
            },
            select: {
                id: true,
                amount: true,
                date: true,
                description: true,
                paymentMethod: true,
                category: true,
                createdAt: true
            }
        });

        if (!transaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }

        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { amount, description, category, date, paymentMethod } = req.body;
        const userId = req.user?.id;

        if (!id) {
            res.status(400).json({ message: 'Transaction ID is required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const existingTransaction = await prisma.transaction.findUnique({
            where: { id, userId }
        });

        if (!existingTransaction) {
            res.status(404).json({ message: 'Transaction not found or unauthorized' });
            return;
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: {
                amount,
                description,
                categoryId: category,
                date,
                paymentMethod
            }
        });

        res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTransactionsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params;
        const userId = req.user?.id;

        if (!categoryId) {
            res.status(400).json({ message: 'Category ID is required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                categoryId,
                userId
            },
            select: {
                id: true,
                amount: true,
                date: true,
                description: true,
                paymentMethod: true,
                category: true,
                createdAt: true
            }
        });

        if (transactions.length === 0) {
            res.status(404).json({ message: 'No transactions found for this category' });
            return;
        }

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTransactionsByDateRange = async (req: Request, res: Response): Promise<void> => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user?.id;

        if (!startDate || !endDate) {
            res.status(400).json({ message: 'Start date and end date are required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string),
                }
            },
            select: {
                id: true,
                amount: true,
                date: true,
                description: true,
                paymentMethod: true,
                category: true,
                createdAt: true
            }
        });

        if (transactions.length === 0) {
            res.status(404).json({ message: 'No transactions found in the given date range' });
            return;
        }

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions by date range:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMonthlyTransactionSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, month } = req.query;
        const userId = req.user?.id;

        if (!year || !month) {
            res.status(400).json({ message: 'Year and month are required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of next month

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                }
            },
            select: {
                id: true,
                amount: true,
                date: true,
                description: true,
                paymentMethod: true,
                category: true,
                createdAt: true
            }
        });

        const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        res.json({
            month,
            year,
            totalAmount,
            transactionCount: transactions.length,
            transactions
        });
    } catch (error) {
        console.error('Error fetching monthly transaction summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
