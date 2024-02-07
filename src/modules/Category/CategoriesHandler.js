import { getAllCategoryController } from "./CategoriesController.js";

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

    next()
}

export default categoryRoute