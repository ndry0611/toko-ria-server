import prisma from "../../utils/prisma.js";

export async function findAllSupplier() {
    try {
        return await prisma.supplier.findMany();
    } catch (error) {
        return new Error(error.message)
    }
}