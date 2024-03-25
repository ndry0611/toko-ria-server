import {
    getAllComplaintController,
    createComplaintController
} from './ComplaintsController.js'

async function complaintRoute(fastify, options, next) {
    const getAllComplaintSchema = {
        schema: {
            tags: ['complaint'],
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            id_user: { type: "integer" },
                            User: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    phone: { type: "string" }
                                }
                            },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_user', 'User', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getAllComplaintSchema, getAllComplaintController);

    const createComplaintSchema = {
        schema: {
            tags: ['complaint'],
            body: {
                type: "object",
                properties: {
                    complaint: { type: "string" },
                },
                additionalProperties: false,
                required: ['complaint']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_user: { type: "integer" },
                        complaint: { type: "string" },
                        created_at: { type: "string" }
                    },
                    required: ['id', 'id_user', 'complaint', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.post('/', createComplaintSchema, createComplaintController);

    next()
}
export default complaintRoute