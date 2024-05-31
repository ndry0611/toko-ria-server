import {
    loginController,
    getMeController,
    registerController,
    createUserController,
    deleteUserController,
    getAllUserController,
    getOneUserController,
    updateUserController,
    changePasswordController
} from './UsersController.js'

async function userRoute(fastify, options, next) {
    const getAllUserSchema = {
        schema: {
            tags: ['user'],
            querystring: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    status: { type: "boolean" },
                    id_role: { type: "integer" }
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
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/', getAllUserSchema, getAllUserController);

    const getMeSchema = {
        schema: {
            tags: ['user'],
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        username: { type: "string" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        status: { type: "boolean" },
                        file_name: { type: ["string", "null"] },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'username', 'name', 'phone', 'address', 'status', 'file_name', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/me', getMeSchema, getMeController);

    const getOneUserSchema = {
        schema: {
            tags: ['user'],
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                },
                required: ['id'],
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        username: { type: "string" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        status: { type: "boolean" },
                        file_name: { type: ["string", "null"] },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'username', 'name', 'phone', 'address', 'status', 'file_name', 'created_at', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isUserOrAdmin]
    }
    fastify.get('/:id', getOneUserSchema, getOneUserController);

    const createUserSchema = {
        schema: {
            tags: ['user'],
            body: {
                type: "object",
                required: ["name", "username", "password", "phone", "address", "id_role"],
                properties: {
                    name: { type: "string" },
                    username: { type: "string" },
                    password: { type: "string" },
                    phone: { type: "string" },
                    address: { type: "string" },
                    id_role: { type: "integer" }
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
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    };
    fastify.post('/', createUserSchema, createUserController);

    const registerSchema = {
        schema: {
            tags: ['auth', 'user'],
            description: 'new registered user cannot be used until status is set "true" by admin',
            body: {
                type: "object",
                required: ["name", "username", "password", "phone", "address"],
                properties: {
                    name: { type: "string" },
                    username: { type: "string" },
                    password: { type: "string" },
                    phone: { type: "string" },
                    address: { type: "string" },
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
        },
    };
    fastify.post('/register', registerSchema, registerController);

    const loginSchema = {
        schema: {
            tags: ['auth', 'user'],
            body: {
                type: "object",
                required: ["username", "password"],
                properties: {
                    username: { type: "string" },
                    password: { type: "string" }
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        token: { type: "string" }
                    },
                    required: ['token']
                },
            }
        }
    }
    fastify.post('/login', loginSchema, loginController);


    const changePasswordSchema = {
        schema: {
            tags: ['user'],
            body: {
                type: "object",
                properties: {
                    old_password: { type: "string" },
                    new_password: { type: "string" },
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type:"object",
                    properties: {
                        name: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        status: { type: "boolean" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.put("/change-password", changePasswordSchema, changePasswordController);

    const updateUserSchema = {
        schema: {
            tags: ['user'],
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
                    name: { type: "string" },
                    phone: { type: "string" },
                    address: { type: "string" },
                    status: { type: "boolean" }
                },
                additionalProperties: false
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        status: { type: "boolean" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isUserOrAdmin]
    }
    fastify.put('/:id', updateUserSchema, updateUserController);

    const deleteUserSchema = {
        schema: {
            tags: ['user'],
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
                        message: { type: "string" }
                    },
                    required: ['message']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.delete('/:id', deleteUserSchema, deleteUserController);

    next()
}

export default userRoute