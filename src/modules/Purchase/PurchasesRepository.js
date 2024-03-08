import prisma from '../../utils/prisma.js'

export async function findManyPurchases(queries) {
    try {
        const purchases = await prisma.purchase.findMany(queries);
        return purchases;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createPurchase(inputs) {
    try {
        //Create Purchase & Details
        const purchase = await prisma.purchase.create({
            data: {
                id_supplier: inputs.id_supplier,
                code: inputs.code,
                purchase_date: inputs.purchase_date,
                grand_total: inputs.grand_total,
                status: inputs.status,
                payment_date: (inputs.payment_date === undefined ? null : inputs.payment_date),
                credit_duration: inputs.credit_duration,
                PurchaseDetail: {
                    createMany: {
                        data: inputs.purchase_detail
                    }
                }
            },
            include: { PurchaseDetail: true }
        });

        //Update Item Stocks in spare_part Table
        await Promise.all(inputs.purchase_detail.map(async (purchaseDetail) => {
            let priceAfterDiscount = Number(purchaseDetail.price) * ((100 - Number(purchaseDetail.discount)) / 100)
            await prisma.sparePart.update({
                where: { id: purchaseDetail.id_spare_part },
                data: {
                    stock: { increment: purchaseDetail.quantity },
                    capital_price: priceAfterDiscount,
                    id_supplier: inputs.id_supplier,
                    supply_date: purchase.created_at
                }
            });
        }));
        return purchase
    } catch (error) {
        throw new Error(error.message);
    }
}