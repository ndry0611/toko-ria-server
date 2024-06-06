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

export async function findSparePartById(queries) {
    try {
        const sparePart = await prisma.sparePart.findUnique(queries);
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
        const result = await prisma.$transaction(async (prisma) => {
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
                await prisma.file.delete({ where: { id: sparePartPhoto.id } })
                return sparePartPhoto.name;
            }
            return null;
        });
        if (result) {
            fs.unlinkSync(path.join('public/uploads/spare_parts', result));
        }
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}