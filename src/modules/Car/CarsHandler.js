import {
    getAllCarController,
    createCarController,
    updateCarController,
    deleteCarController
} from "./CarsController.js";

async function carRoute(fastify, options, next) {
    const getAllCarSchema = {
        schema: {
            tags: ['car'],
            querystring: {
                type: "object",
                properties: {
                    id_car_brand: { type: "integer" },
                    name: { type: "string" },
                    production_year: { type: "string" }
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            id_car_brand: { type: "integer" },
                            CarBrand: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    manufacture: { type: "string" }
                                }
                            },
                            name: { type: "string" },
                            production_year: { type: "string" },
                            type: { type: ["string", "null"] },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_car_brand', 'CarBrand', 'name', 'production_year', 'type', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getAllCarSchema, getAllCarController);

    const createCarSchema = {
        schema: {
            tags: ['car'],
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
                        type: { type: ["string", "null"] },
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
            tags: ['car'],
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
                        type: { type: ["string", "null"] },
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
            tags: ['car'],
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