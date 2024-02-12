import {
    getAllCarBrandController,
    createCarBrandController,
    updateCarBrandController,
    deleteCarBrandController
} from './CarBrandsController.js';

async function carBrandRoute(fastify, options, next) {
    const getAllCarBrandSchema = {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            manufacture: { type: "string" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'name', 'manufacture', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getAllCarBrandSchema, getAllCarBrandController);

    const createCarBrandSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    manufacture: { type: "string" }
                },
                required: ['name', 'manufacture'],
                additionalProperties: false,
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        manufacture: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'manufacture', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createCarBrandSchema, createCarBrandController);

    const updateCarBrandSchema = {
        schema: {
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
                    manufacture: { type: "string" }
                },
                additionalProperties: false,
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        manufacture: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'manufacture', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateCarBrandSchema, updateCarBrandController);

    const deleteCarBrandSchema = {
        schema: {
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
                        message: { type: "string" },
                    },
                    required: ['message']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.delete('/:id', deleteCarBrandController)

    next()
}

export default carBrandRoute;