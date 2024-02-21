import prisma from "../../utils/prisma.js";

export async function findAllSparePartBrands() {
    try {
        return await prisma.sparePartBrand.findMany()
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function findSparePartBrandById(id) {
    try {
        return await prisma.sparePartBrand.findUnique({
            where: { id: Number(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createSparePartBrand(inputs) {
    try {
        const sparePartBrand = await prisma.sparePartBrand.create({
            data: inputs
        });
        return sparePartBrand
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateSparePartBrand(id, inputs) {
    try {
        const sparePartBrand = await prisma.sparePartBrand.update({
            where: { id: Number(id) },
            data: inputs
        });
        return sparePartBrand
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteSparePartBrand(id) {
    try {
        await prisma.sparePartBrand.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}