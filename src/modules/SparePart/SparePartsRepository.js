import prisma from "../../utils/prisma";

export async function findAllSparePart() {
    try {
        return await prisma.spareParts.findMany();
    } catch (error) {
        throw new Error(error.message);
    }
}