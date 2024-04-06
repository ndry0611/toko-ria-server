import {
    findAllCategory,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from './CategoriesRepository.js';

export async function getAllCategoryController(request, reply) {
    try {
        const categories = await findAllCategory();
        return reply.code(200).send(categories);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOneCategoryController(request, reply) {
    try {
        const category = await findCategoryById(request.params.id);
        if (!category) {
            return reply.code(404).send(Error("Category is not found!"));
        }
        return reply.code(200).send(category);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
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

export async function updateCategoryController(request, reply) {
    const body = request.body;
    if (!await findCategoryById(request.params.id)) {
        return reply.code(404).send(Error("Category is not found!"));
    }
    try {
        const category = await updateCategory(request.params.id, body);
        return reply.code(200).send(category);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteCategoryController(request, reply) {
    try {
        await deleteCategory(request.params.id);
        return reply.code(200).send({ message: `Category with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}