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
                    name_keyword: { type: "string" },
                    status: { type: "string", enum: ["ACTIVE", "INACTIVE"] }
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
                            company_phone: { type: ["string", "null"] },
                            pic_name: { type: "string" },
                            pic_phone: { type: ["string", "null"] },
                            bank_account: { type: "string" },
                            bank_account_name: { type: "string" },
                            address: { type: ["string", "null"] },
                            status: { type: "string" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'company_name', 'pic_name', 'bank_account', 'bank_account_name', 'address', 'status', 'created_at', 'updated_at']
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
                        company_phone: { type: ["string", "null"] },
                        pic_name: { type: "string" },
                        pic_phone: { type: ["string", "null"] },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        status: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    required: ['id', 'company_name', 'pic_name', 'bank_account', 'bank_account_name', 'address', 'status', 'created_at', 'updated_at']
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
                    company_phone: { type: ["string", "null"] },
                    pic_name: { type: "string" },
                    pic_phone: { type: ["string", "null"] },
                    bank_account: { type: "string" },
                    bank_account_name: { type: "string" },
                    address: { type: "string" },
                    status: {type:"string", enum: ["ACTIVE", "INACTIVE"]}
                },
                additionalProperties: false,
                required: ['company_name', 'pic_name', 'bank_account', 'bank_account_name', 'status']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        company_name: { type: "string" },
                        company_phone: { type: ["string", "null"] },
                        pic_name: { type: "string" },
                        pic_phone: { type: ["string", "null"] },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        status: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['company_name',  'pic_name', 'bank_account', 'bank_account_name', 'address', 'status', 'created_at']
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
                    company_phone: { type: ["string", "null"] },
                    pic_name: { type: "string" },
                    pic_phone: { type: ["string", "null"] },
                    bank_account: { type: "string" },
                    bank_account_name: { type: "string" },
                    address: { type: "string" },
                    status: {type:"string", enum: ["ACTIVE", "INACTIVE"]}
                },
                additionalProperties: false,
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        company_name: { type: "string" },
                        company_phone: { type: ["string", "null"] },
                        pic_name: { type: "string" },
                        pic_phone: { type: ["string", "null"] },
                        bank_account: { type: "string" },
                        bank_account_name: { type: "string" },
                        address: { type: ["string", "null"] },
                        status: { type: "string" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    additionalProperties: false,
                    required: ['id', 'company_name', 'pic_name', 'bank_account', 'bank_account_name', 'address', 'status', 'updated_at']
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