import {
    createUserController,
    getAllUserController
} from './UsersController.js'

async function userRoute(fastify, options, next) {

    const getAllUserSchema = {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            username: { type: "string" },
                            name: { type: "string" },
                            phone: { type: "string" },
                            address: { type: "string" },
                            status: { type: "boolean" },
                            id_role: { type: "integer" },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" },
                        },
                        required: ['id', 'username', 'name', 'phone', 'address', 'status', 'id_role', 'created_at', 'updated_at']
                    },
                }
            }
        }
    }
    fastify.get('/', getAllUserSchema, getAllUserController);

    const createUserSchema = {
        schema: {
            body: {
                type: "object",
                required: ["name", "username", "password", "phone", "address"],
                properties: {
                    name: { type: "string" },
                    username: { type: "string" },
                    password: { type: "string" },
                    address: { type: "string" },
                    phone: { type: "string" },
                    id_role: { type: "integer", minimum: 1 }
                },
                additionalProperties: false,
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer", minimum: 1 },
                        username: { type: "string" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        created_at: { type: "string", format: "date-time" }
                    },
                    required: ["id", "username", "phone", "address", "created_at"]
                }
            }
        }
    };
    fastify.post('/', createUserSchema, createUserController);

    next()
}

export default userRoute