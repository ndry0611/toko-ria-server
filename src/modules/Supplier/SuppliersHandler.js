import {
    getAllSupplierController,
    createSupplierController
} from './SuppliersController.js'

async function supplierRoute(fastify, options, next) {
    const getAllSupplierSchema = {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            company_name: { type: "string" },
                            company_phone: { type: "string" },
                            pic_name: { type: "string" },
                            pic_phone: { type: "string" },
                            bank_account: { type: "string" },
                            bank_account_name: { type: "string" },
                            address: { type: "string" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name', 'address', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getAllSupplierSchema, getAllSupplierController);

    const createSupplierSchema = {
        schema: {
            body: {
                type: "object",
                properties: {
                    company_name: { type: "string" },
                    company_phone: { type: "string" },
                    pic_name: { type: "string" },
                    pic_phone: { type: "string" },
                    bank_account: { type: "string" },
                    bank_account_name: { type: "string" },
                    address: { type: "string" },
                },
                additionalProperties: false,
                required: ['company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name', 'address']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        company_phone: { type: "string" },
                        pic_name: { type: "string" },
                        pic_phone: { type: "string" },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createSupplierSchema, createSupplierController);

    next()
}

export default supplierRoute;