import prisma from "../../utils/prisma.js";
import * as fs from 'fs'
import * as path from 'path'

export async function findAllSparePart(queries) {
    try {
        const spareParts = await prisma.sparePart.findMany(queries);
        const sparePartsWithImage = await Promise.all(spareParts.map(async (sparePart) => {

            // Find File
            const file = await prisma.file.findFirst({
                where: {
                    file_model: "spare_parts",
                    file_id: sparePart.id
                }
            });
            sparePart.file_name = file ? file.name : null
            return sparePart
        }));
        return sparePartsWithImage;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findSparePartById(id) {
    try {
        const sparePart = await prisma.sparePart.findUnique({
            where: { id: Number(id) },
            include: {
                SparePartBrand: true,
                Car: true
            }
        });
        if (sparePart) {
            const sparePartPhoto = await prisma.file.findFirst({
                where: {
                    file_model: "spare_parts",
                    file_id: sparePart.id
                }
            });
            sparePart.file_name = sparePartPhoto ? sparePartPhoto.name : null;
        }
        return sparePart;
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
        const sparePartPhoto = await prisma.file.findFirst({
            where: {
                file_model: "spare_parts",
                file_id: id
            }
        });
        if (sparePartPhoto) {
            fs.unlinkSync(path.join('public/uploads/spare_parts', sparePartPhoto.name));
        }
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}