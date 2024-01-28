import { createUserController } from './UsersController.js'

async function userRoute(fastify, options, next) {
    // fastify.get('/', getAllUsers);

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