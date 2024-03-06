import prisma from '../../utils/prisma.js'

export async function findManyPurchases(queries) {
    try {
        const purchases = await prisma.purchase.findMany(queries);
        return purchases;
    } catch (error) {
        throw new Error(error.message);
    }
}