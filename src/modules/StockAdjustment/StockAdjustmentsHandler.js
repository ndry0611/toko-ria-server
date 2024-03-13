import {
    getAllStockAdjustmentController,
    createStockAdjustmentAndUpdateSparePartStockController
} from './StockAdjustmentsController.js'

async function stockAdjustmentRoute(fastify, options, next) {
    const getAllStockAdjustmentSchema = {
        schema: {
            querystring: {
                type: "object",
                properties: {
                    id_spare_part: { type: "integer" },
                    start_date: { type: "string", format: "date-time" },
                    end_date: { type: "string", format: "date-time" }
                }
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
                                    id_spare_part_brand: { type: "integer" },
                                    SparePartBrand: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string" }
                                        }
                                    },
                                    name: { type: "string" },
                                    stock: { type: "integer" },
                                }
                            },
                            old_quantity: { type: "integer" },
                            new_quantity: { type: "integer" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_spare_part', 'SparePart', 'old_quantity', 'new_quantity', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getAllStockAdjustmentSchema, getAllStockAdjustmentController);

    const createStockAdjustmentSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    id_spare_part: { type: "integer" },
                    code: { type: "string" },
                    description: { type: "string" },
                    old_quantity: { type: "integer" },
                    new_quantity: { type: "integer" }
                },
                additionalProperties: false,
                required: ['id_spare_part', 'code', 'description', 'old_quantity', 'new_quantity']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_spare_part: { type: "integer" },
                        code: { type: "string" },
                        description: { type: "string" },
                        old_quantity: { type: "integer" },
                        new_quantity: { type: "integer" },
                        created_at: { type: "string", format: "date-time" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createStockAdjustmentSchema, createStockAdjustmentAndUpdateSparePartStockController);

    next()
}

export default stockAdjustmentRoute