import prisma from "../../utils/prisma.js";

export async function findManySpecialPrice(queries) {
    try {
        const specialPrices = await prisma.specialPrice.findMany(queries);
        return specialPrices;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createSpecialPrice(inputs) {
    try {
        const specialPrice = await prisma.specialPrice.create({
            data: inputs
        });
        return specialPrice;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createManyUserSpecialPrice(inputs) {
    try {
        await prisma.$transaction(async (prisma) => {
            for (const userId of inputs.id_user) {
                const sPrice = await prisma.specialPrice.findFirst({
                    where: {
                        id_user: userId,
                        id_spare_part: inputs.id_spare_part
                    }
                });
                if (sPrice) {
                    await prisma.specialPrice.update({
                        where: {
                            id: sPrice.id
                        },
                        data: {
                            price: inputs.price
                        }
                    });
                } else {
                    await prisma.specialPrice.create({
                        data: {
                            id_spare_part: inputs.id_spare_part,
                            id_user: userId,
                            price: inputs.price
                        }
                    });
                }
            }
        });
        return {
            message: "Multiple Insert Success"
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteSpecialPrice(id) {
    try {
        await prisma.specialPrice.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}