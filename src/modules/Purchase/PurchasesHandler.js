import {
    getPurchasesController,
    createPurchaseController,
    updatePurchaseController
} from './PurchasesController.js'

async function purchaseRoute(fastify, options, next) {
    const getPurchasesSchema = {
        schema: {
            querystring: {
                type: "object",
                properties: {
                    id_supplier: { type: "integer" },
                    code: { type: "string" },
                    start_date: { type: "string", format: "date-time" },
                    end_date: { type: "string", format: "date-time" },
                    status: { type: "integer" }
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
                            id_supplier: { type: "integer" },
                            Supplier: {
                                type: "object",
                                properties: {
                                    company_name: { type: "string" },
                                }
                            },
                            code: { type: "string" },
                            purchase_date: { type: "string", format: "date-time" },
                            grand_total: { type: "integer" },
                            status: { type: "integer" },
                            payment_date: { type: ["string", null], format: "date-time" },
                            credit_duration: { type: "integer" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" },
                        },
                        required: ['id', 'id_supplier', 'code', 'purchase_date', 'grand_total', 'status', 'payment_date', 'credit_duration', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getPurchasesSchema, getPurchasesController);

    const createPurchaseSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    id_supplier: { type: "integer" },
                    code: { type: "string" },
                    purchase_date: { type: "string", format: "date-time" },
                    grand_total: { type: "integer" },
                    payment_date: { type: "string", format: "date-time" },
                    credit_duration: { type: "integer" },
                    status: { type: "integer" },
                    purchase_detail: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id_spare_part: { type: "integer" },
                                quantity: { type: "integer" },
                                price: { type: "integer" },
                                discount: { type: "number" },
                                total_price: { type: "integer" },
                            },
                            additionalProperties: false,
                            required: ['id_spare_part', 'quantity', 'price', 'total_price']
                        }
                    }
                },
                additionalProperties: false,
                required: ['id_supplier', 'code', 'purchase_date', 'grand_total', 'credit_duration', 'status', 'purchase_detail']
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_supplier: { type: "integer" },
                        code: { type: "string" },
                        purchase_date: { type: "string", format: "date-time" },
                        grand_total: { type: "integer" },
                        payment_date: { type: ["string", "null"], format: "date-time" },
                        credit_duration: { type: "integer" },
                        status: { type: "integer" },
                        created_at: { type: "string", format: "date-time" }
                    },
                    required: ['id', 'id_supplier', 'code', 'purchase_date', 'grand_total', 'payment_date', 'credit_duration', 'status', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    };
    fastify.post('/', createPurchaseSchema, createPurchaseController)

    const updatePurchaseSchema = {
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
                    code: { type: "string" },
                    purchase_date: { type: "string", format: "date-time" },
                    payment_date: { type: "string", format: "date-time" },
                    credit_duration: { type: "integer" },
                    status: { type: "integer" },
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_supplier: { type: "integer" },
                        code: { type: "string" },
                        purchase_date: { type: "string", format: "date-time" },
                        grand_total: { type: "integer" },
                        payment_date: { type: ["string", "null"], format: "date-time" },
                        credit_duration: { type: "integer" },
                        status: { type: "integer" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    required: ['id', 'id_supplier', 'code', 'purchase_date', 'grand_total', 'payment_date', 'credit_duration', 'status', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updatePurchaseSchema, updatePurchaseController)

    next()
}

export default purchaseRoute;