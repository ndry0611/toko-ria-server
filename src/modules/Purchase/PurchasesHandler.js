import {
    getPurchasesController
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
                            payment_date: { type: "string", format: "date-time" },
                            credit_duration: { type: "integer" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" },
                        },
                        required: ['id', 'id_supplier', 'Supplier', 'code', 'purchase_date', 'grand_total', 'status', 'payment_date', 'credit_duration', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getPurchasesSchema, getPurchasesController);

    next()
}

export default purchaseRoute;