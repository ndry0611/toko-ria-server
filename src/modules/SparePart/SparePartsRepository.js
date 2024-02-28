import prisma from "../../utils/prisma.js";

export async function findAllSparePart() {
    try {
        return await prisma.spareParts.findMany();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findSparePartById(id) {
    try {
        return await prisma.sparePart.findUnique({
            where: { id: Number(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createSparePart(inputs) {
    try {
        const sparePart = await prisma.sparePart.create({
            data: inputs
        });
        return sparePart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateSparePart(id, inputs) {
    try {
        const sparePart = await prisma.sparePart.update({
            where: { id: Number(id) },
            data: inputs
        });
        return sparePart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteSparePart(id) {
    try {
        await prisma.sparePart.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}