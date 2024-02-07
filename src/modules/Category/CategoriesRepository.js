import prisma from "../../utils/prisma.js";

export async function findAllCategory() {
    try {
        // find all categories
        const categories = await prisma.category.findMany()
        // map all categories and search for the files, thru models.
        const categoriesWithImage = await Promise.all(categories.map(async (category) => {
            const file = await prisma.file.findUnique({
                where: {
                    file_model: "categories",
                    file_id: category.id
                }
            });
            return {
                ...category,
                file_name: file ? file.name : null
            };
        }));
        return categoriesWithImage;
    } catch (error) {
        throw new Error(error.message);
    }
}