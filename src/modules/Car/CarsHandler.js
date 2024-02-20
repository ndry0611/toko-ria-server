import {
    getAllCarController,
    createCarController,
    updateCarController,
    deleteCarController
} from "./CarsController.js";

async function carRoute(fastify, options, next) {
    const getAllCarSchema = {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            id_car_brand: { type: "integer" },
                            name: { type: "string" },
                            production_year: { type: "string" },
                            type: { type: "string" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_car_brand', 'name', 'production_year', 'type', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getAllCarSchema, getAllCarController);

    const createCarSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    id_car_brand: { type: "integer" },
                    production_year: { type: "string" },
                    type: { type: "string" }
                },
                additionalProperties: false,
                required: ['name', 'id_car_brand', 'production_year']
                
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_car_brand: { type: "integer" },
                        name: { type: "string" },
                        production_year: { type: "string" },
                        type: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'id_car_brand', 'name', 'production_year', 'type', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createCarSchema, createCarController);

    const updateCarSchema = {
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
                    id_car_brand: { type: "integer" },
                    production_year: { type: "string" },
                    type: { type: "string" }
                },
                additionalProperties: false,
                required: ['name', 'id_car_brand', 'production_year']
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_car_brand: { type: "integer" },
                        name: { type: "string" },
                        production_year: { type: "string" },
                        type: { type: "string" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    required: ['id', 'id_car_brand', 'name', 'production_year', 'type', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateCarSchema, updateCarController);

    const deleteCarSchema = {
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
    fastify.delete('/:id', deleteCarSchema, deleteCarController)

    next()
}

export default carRoute