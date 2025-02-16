import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    try {
        const currencies = await prisma.currency.findMany({
            select: {
                id: true,
                name: true,
                symbol: true,
            },
        });

        res.status(200).json({
            message: 'Currencies sent correctly',
            data: currencies,
        });
    } catch (error) {
        console.error('Error getting currencies:', error);
        res.status(500).json({ message: 'Internal server error' });
        throw error;
    }
}