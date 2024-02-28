import prisma from "../../utils/prisma.js";

export async function findManySpecialPriceBySparePartId(sparePartId) {
    try {
        const specialPrices = await prisma.specialPrice.findMany({
            where: { id_spare_part: sparePartId },
            include: { User: true, SparePart: true }
        });
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