import prisma from "../../utils/prisma.js";

export async function findAllStockAdjustment(queries) {
    try {
        const stockAdjustments = await prisma.stockAdjustment.findMany(queries);
        return stockAdjustments
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createStockAdjustment(inputs) {
    try {
        const stockAdjustment = await prisma.stockAdjustment.create({
            data: inputs
        });
        return stockAdjustment
    } catch (error) {
        throw new Error(error.message);
    }
}