import prisma from "../../utils/prisma.js";

export async function findAllSupplier(queries) {
    try {
        return await prisma.supplier.findMany(queries);
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function findSupplierById(id) {
    try {
        return await prisma.supplier.findUnique({
            where: { id: Number(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createSupplier(inputs) {
    try {
        const supplier = prisma.supplier.create({
            data: inputs
        });
        return supplier;
    } catch (error) {
        throw new Error(error.message);
    }
};

export async function updateSupplier(id, inputs) {
    try {
        const supplier = await prisma.supplier.update({
            where: { id: Number(id) },
            data: inputs
        });
        return supplier;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteSupplier(id) {
    try {
        await prisma.supplier.delete({
            where: { id: Number(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}