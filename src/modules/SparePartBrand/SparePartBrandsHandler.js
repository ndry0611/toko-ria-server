import {
    getAllSparePartBrandController,
    createSparePartBrandController,
    updateSparePartBrandController,
    deleteSparePartBrandController
} from './SparePartBrandsController.js'

async function sparePartBrandRoute(fastify, options, next) {
    const getAllSparePartBrandSchema = {
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
    fastify.get('/', getAllSparePartBrandSchema, getAllSparePartBrandController);

    const createSparePartBrandSchema = {
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
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        manufacture: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'manufacture', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createSparePartBrandSchema, createSparePartBrandController);

    const updateSparePartBrandSchema = {
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
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'name', 'manufacture', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateSparePartBrandSchema, updateSparePartBrandController)

    const deleteSparePartBrandSchema = {
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
    fastify.delete('/:id', deleteSparePartBrandSchema, deleteSparePartBrandController)

    next()
}

export default sparePartBrandRoute