import {
    getAllCategoryController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
} from "./CategoriesController.js";

async function categoryRoute(fastify, options, next) {
    const getAllCategorySchema = {
        schema: {
            tags: ['category'],
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            description: { type: "string" },
                            file_name: { type: ["string", "null"] },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'name', 'description', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getAllCategorySchema, getAllCategoryController);

    const createCategorySchema = {
        schema: {
            tags: ['category'],
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                },
                additionalProperties: false,
                required: ['name', 'description']
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        description: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'description', 'file_name', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createCategorySchema, createCategoryController)

    const updateCategorySchema = {
        schema: {
            tags: ['category'],
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                },
                required: ['id']
            },
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    description: { type: "string" }
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        description: { type: "string" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'description', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateCategorySchema, updateCategoryController)

    const deleteCategorySchema = {
        schema: {
            tags: ['category'],
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                },
                required: ['id']
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    },
                    required: ['message']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.delete('/:id', deleteCategorySchema, deleteCategoryController)

    next()
}

export default categoryRoute