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
                userId: userId,
            }
        })

        // Sort transactions by date in ascending order
        transactions.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

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

export const getPredictionAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' })
            return
        }
    
        const now = new Date()
        const sixMonthsAgo = new Date(now)
        sixMonthsAgo.setMonth(now.getMonth() - 6)
        const allTx = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: sixMonthsAgo
                }
            },
            select: {
                amount: true,
                date: true,
                description: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })    

        const threeMonthsAgo = new Date(now)
        threeMonthsAgo.setMonth(now.getMonth() - 3)
        const last3 = allTx.filter(t => new Date(t.date) >= threeMonthsAgo)
        
        const catSums: Record<string, number> = {}
        last3.forEach(t => {
            const cat = t.category?.name ?? 'Uncategorized'
            catSums[cat] = (catSums[cat] || 0) + t.amount
        })
        
        const categoryForecast: Record<string, number> = {}
        const months = 3
        for (const [cat, sum] of Object.entries(catSums)) {
            categoryForecast[cat] = parseFloat((sum / months).toFixed(2))
        }
        
        const sorted = last3
            .map(t => ({ date: new Date(t.date), amount: t.amount }))
            .sort((a, b) => a.date.getTime() - b.date.getTime())
        
        const MS_PER_DAY = 1000 * 60 * 60 * 24;

        let nextTransaction = null;
        if (sorted.length >= 2) {
            const intervals = sorted.slice(1).map((t, i) =>
                (t.date.getTime() - sorted[i].date.getTime()) / MS_PER_DAY
            );
            console.log("Raw intervals:", intervals);
            
            const s = [...intervals].sort((a, b) => a - b);
            const q1 = s[Math.floor((s.length - 1) * 0.25)];
            const q3 = s[Math.floor((s.length - 1) * 0.75)];
            const iqr = q3 - q1;
            const trimmed = s.filter(x => x >= q1 - 1.5 * iqr && x <= q3 + 1.5 * iqr);
            const trimmedMean =
                trimmed.reduce((sum, x) => sum + x, 0) / trimmed.length;
            console.log("Trimmed mean interval:", trimmedMean);
            
            const totalWeight = intervals.reduce((sum, _, i) => sum + (i + 1), 0);
            const weightedAvg =
                intervals.reduce((sum, x, i) => sum + x * (i + 1), 0) / totalWeight;
            console.log("Weighted avg interval:", weightedAvg);
            
            const avgInterval = 0.5 * trimmedMean + 0.5 * weightedAvg;
            console.log("Blended interval:", avgInterval);
            
            const amounts = sorted.map(t => t.amount).sort((a, b) => a - b);
            const m = Math.floor(amounts.length / 2);
            const medianAmount =
                amounts.length % 2
                ? amounts[m]
                : (amounts[m - 1] + amounts[m]) / 2;
            console.log("Median amount:", medianAmount);
            
            const lastTime = sorted[sorted.length - 1].date.getTime();
            let predictedTime = lastTime + avgInterval * MS_PER_DAY;
            const now = Date.now();
            if (predictedTime < now) {
                const gap = now - predictedTime;
                const leaps = Math.ceil(gap / (avgInterval * MS_PER_DAY));
                predictedTime += leaps * avgInterval * MS_PER_DAY;
            }
            const predictedDate = new Date(predictedTime);
            
            nextTransaction = {
                predictedDate: predictedDate.toISOString().slice(0, 10),
                predictedAmount: +medianAmount.toFixed(2)
            };
            console.log("Next transaction prediction:", nextTransaction);
        }
        
        const byDesc: Record<string, Date[]> = {}
        allTx.forEach(t => {
            const desc = t.description.trim().toLowerCase()
            byDesc[desc] = byDesc[desc] || []
            byDesc[desc].push(new Date(t.date))
        })
        
        const recurring = Object.entries(byDesc)
            .filter(([, dates]) => dates.length >= 3)
            .map(([desc, dates]) => {
                const sortedD = dates.sort((a,b) => a.getTime() - b.getTime())
                const ints = []
                for (let i = 1; i < sortedD.length; i++) {
                    ints.push((sortedD[i].getTime() - sortedD[i-1].getTime()) / (1000*60*60*24))
                }
                const avgInt = ints.reduce((a,b) => a+b, 0) / ints.length
                const last = sortedD[sortedD.length -1]
                const next = new Date(last)
                next.setDate(next.getDate() + Math.round(avgInt))
                
                const amounts = allTx.filter(t => t.description.trim().toLowerCase() === desc).map(t => t.amount)
                const avgAmt = amounts.reduce((a,b) => a+b, 0) / amounts.length
            
                const result = {
                    description: desc,
                    predictedDate: next.toISOString().split('T')[0],
                    predictedAmount: parseFloat(avgAmt.toFixed(2))
                }
                return result
            })
    
        res.json({
            categoryForecast,
            nextTransaction,
            recurringTransactions: recurring
        })
    } catch (error) {
        console.error('Error in prediction analytics:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
