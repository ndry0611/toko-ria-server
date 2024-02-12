import { 
    getAllCategoryController,
    createCategoryController
} from "./CategoriesController.js";

async function categoryRoute(fastify, options, next) {
    const getAllCategorySchema = {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            description: { type: "string" },
                            file_name: { type: "string" },
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
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                },
                required: ['name', 'description']
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        description: { type: "string" },
                        file_name: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'description', 'file_name', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createCategorySchema, createCategoryController)

    next()
}

export default categoryRoute