import prisma from "../../utils/prisma.js";
import * as fs from 'fs'
import * as path from 'path'

export async function findAllCategory() {
    try {
        // find all categories
        const categories = await prisma.category.findMany({ orderBy: { id: "asc" } })
        // map all categories and search for the files, thru models.
        const categoriesWithImage = await Promise.all(categories.map(async (category) => {
            const file = await prisma.file.findFirst({
                where: {
                    file_model: "categories",
                    file_id: category.id
                }
            });
            category.file_name = file ? file.name : null
            return category
        }));
        return categoriesWithImage;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findCategoryById(id) {
    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) }
        });
        if (category) {
            const categoryPhoto = await prisma.file.findFirst({
                where: {
                    file_model: "categories",
                    file_id: category.id
                }
            });
            category.file_name = categoryPhoto ? categoryPhoto.name : null;
        }
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createCategory(inputs) {
    try {
        const category = await prisma.category.create({
            data: inputs
        });
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateCategory(id, inputs) {
    try {
        const category = await prisma.category.update({
            where: { id: Number(id) },
            data: inputs
        });
        return category
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteCategory(id) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            await prisma.category.delete({
                where: { id: Number(id) }
            });
            const categoryPhoto = await prisma.file.findFirst({
                where: {
                    file_model: "categories",
                    file_id: id
                }
            });
            if (categoryPhoto) {
                await prisma.file.delete({ where: { id: categoryPhoto.id } })
                return categoryPhoto.name
            }
            return null;
        });
        if (result) {
            fs.unlinkSync(path.join('public/uploads/categories', result));
        }
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}