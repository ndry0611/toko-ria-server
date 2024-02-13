import prisma from "../../utils/prisma.js";

export async function findAllSupplier() {
    try {
        return await prisma.supplier.findMany();
    } catch (error) {
        throw new Error(error.message)
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