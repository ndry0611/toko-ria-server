import prisma from "../../utils/prisma.js";

export async function findAllComplaints(queries) {
    try {
        const complaints = await prisma.complaint.findMany(queries);
        return complaints;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createComplaint(inputs) {
    try {
        const complaint = await prisma.complaint.create({
            data: inputs
        });
        return complaint;
    } catch (error) {
        throw new Error(error.message);
    }
}