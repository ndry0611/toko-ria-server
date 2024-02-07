import {
    findAllCategory
} from './CategoriesRepository.js';

export async function getAllCategoryController(request, reply) {
    try {
        const categories = await findAllCategory();
        reply.code(200).send(categories);
    } catch (error) {
        reply.code(500).send(Error(error.message));
    }
}