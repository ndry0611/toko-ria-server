import {
    getAllSupplierController,
    getOneSupplierController,
    createSupplierController,
    updateSupplierController,
    deleteSupplierController,
} from './SuppliersController.js'

async function supplierRoute(fastify, options, next) {
    const getAllSupplierSchema = {
        schema: {
            tags: ['supplier'],
            querystring: {
                type: "object",
                properties: {
                    name_keyword: { type: "string" }
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
                            company_name: { type: "string" },
                            company_phone: { type: "string" },
                            pic_name: { type: "string" },
                            pic_phone: { type: "string" },
                            bank_account: { type: "string" },
                            bank_account_name: { type: "string" },
                            address: { type: ["string", "null"] },
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

    const getOneSupplierSchema = {
        schema: {
            tags: ['supplier'],
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
                        id: { type: "integer" },
                        company_name: { type: "string" },
                        company_phone: { type: "string" },
                        pic_name: { type: "string" },
                        pic_phone: { type: "string" },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    required: ['id', 'company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name', 'address', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/:id', getOneSupplierSchema, getOneSupplierController)

    const createSupplierSchema = {
        schema: {
            tags: ['supplier'],
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
                required: ['company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        company_name: { type: "string" },
                        company_phone: { type: "string" },
                        pic_name: { type: "string" },
                        pic_phone: { type: "string" },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name', 'address', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createSupplierSchema, createSupplierController);

    const updateSupplierSchema = {
        schema: {
            tags: ['supplier'],
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
                    company_name: { type: "string" },
                    company_phone: { type: "string" },
                    pic_name: { type: "string" },
                    pic_phone: { type: "string" },
                    bank_account: { type: "string" },
                    bank_account_name: { type: "string" },
                    address: { type: "string" },
                },
                additionalProperties: false,
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        company_name: { type: "string" },
                        company_phone: { type: "string" },
                        pic_name: { type: "string" },
                        pic_phone: { type: "string" },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    additionalProperties: false,
                    required: ['id', 'company_name', 'company_phone', 'pic_name', 'pic_phone', 'bank_account', 'bank_account_name', 'address', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateSupplierSchema, updateSupplierController)

    const deleteSupplierSchema = {
        schema: {
            tags: ['supplier'],
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
    fastify.delete('/:id', deleteSupplierSchema, deleteSupplierController)

    next()
}

export default supplierRoute;