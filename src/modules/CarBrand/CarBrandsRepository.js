import prisma from "../../utils/prisma.js";

export async function findAllCarBrand() {
    try {
        return await prisma.carBrand.findMany({ orderBy: { id: "asc" } })
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function findCarBrandById(id) {
    try {
        return await prisma.carBrand.findUnique({
            where: { id: Number(id) }
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createCarBrand(inputs) {
    try {
        const carBrand = await prisma.carBrand.create({
            data: inputs
        });
        return carBrand;
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function updateCarBrand(id, inputs) {
    try {
        const carBrand = await prisma.carBrand.update({
            where: { id: Number(id) },
            data: inputs
        });
        return carBrand;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteCarBrand(id) {
    try {
        await prisma.carBrand.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}