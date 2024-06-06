import prisma from '../../utils/prisma.js'

export async function findManyPurchases(queries) {
    try {
        const purchases = await prisma.purchase.findMany(queries);
        return purchases;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findOnePurchase(queries) {
    try {
        const purchase = await prisma.purchase.findFirst(queries);
        if (purchase.PurchaseDetail) {
            await Promise.all(purchase.PurchaseDetail.map(async (pDetail) => {
                const file = await prisma.file.findFirst({
                    where: {
                        file_model: "spare_parts",
                        file_id: pDetail.id_spare_part
                    }
                });
                pDetail.SparePart.file_name = file ? file.name : null
            }));
        }
        return purchase;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createPurchase(inputs) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
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
            return purchase;
        });
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updatePurchase(id, inputs) {
    try {
        const purchase = await prisma.purchase.update({
            where: { id: Number(id) },
            data: inputs
        });
        return purchase;
    } catch (error) {
        throw new Error(error.message);
    }
}