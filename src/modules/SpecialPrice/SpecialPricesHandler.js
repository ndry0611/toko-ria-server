import {
    getSpecialPriceBySparePartIdController,
    createSpecialPriceController,
    deleteSpecialPriceController
} from './SpecialPricesController.js'

async function specialPriceRoute(fastify, options, next) {
    const getSpecialPriceBySparePartIdSchema = {
        schema: {
            params: {
                type: "object",
                properties: {
                    sparePartId: { type: "integer" }
                },
                required: ['sparePartId']
            },
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            id_spare_part: { type: "integer" },
                            SparePart: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    capital_price: { type: "integer" },
                                    sale_price: { type: "integer" }
                                }
                            },
                            id_user: { type: "integer" },
                            User: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    phone: { type: "string" },
                                    address: { type: "string" }
                                },
                            },
                            price: { type: "integer" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_spare_part', 'id_user', 'User', 'price', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/:sparePartId', getSpecialPriceBySparePartIdSchema, getSpecialPriceBySparePartIdController)

    const createSpecialPriceSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    id_spare_part: { type: "integer" },
                    id_user: { type: "integer" },
                    price: { type: "integer" }
                },
                additionalProperties: false,
                required: ['id_spare_part', 'id_user', 'price']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_spare_part: { type: "integer" },
                        id_user: { type: "integer" },
                        price: { type: "integer" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'id_spare_part', 'id_user', 'price', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createSpecialPriceSchema, createSpecialPriceController);

    const deleteSpecialPriceSchema = {
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
    fastify.delete('/:id', deleteSpecialPriceSchema, deleteSpecialPriceController)

    next()
}

export default specialPriceRoute