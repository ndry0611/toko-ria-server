import {
    findAllCategory,
    createCategory
} from './CategoriesRepository.js';

export async function getAllCategoryController(request, reply) {
    try {
        const categories = await findAllCategory();
        reply.code(200).send(categories);
    } catch (error) {
        reply.code(500).send(Error(error.message));
    }
}

export async function createCategoryController(request, reply) {
    const body = request.body;
    try {
        const category = await createCategory(body);
        return reply.code(201).send(category)
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}