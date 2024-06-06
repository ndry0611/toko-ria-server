import {
    getUserCartController,
    addCartDetailsController,
    cartCheckoutController,
    deleteCartDetailController
} from './CartsController.js'

async function cartRoute(fastify, options, next) {
    const getUserCartSchema = {
        schema: {
            tags: ['cart'],
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_user: { type: "integer" },
                        grand_total: { type: "integer" },
                        CartDetail: {
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
                                                    name: { type: "string" },
                                                    manufacture: { type: "string" }
                                                }
                                            },
                                            id_car: { type: ["integer", "null"] },
                                            Car: {
                                                type: ["object", "null"],
                                                properties: {
                                                    id_car_brand: { type: "integer" },
                                                    CarBrand: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string" }
                                                        }
                                                    },
                                                    name: { type: "string" },
                                                    production_year: { type: "string" },
                                                    type: { type: "string" }
                                                }
                                            },
                                            name: { type: "string" },
                                            part_no: { type: "string" },
                                            genuine: { type: "string" },
                                            stock: { type: "integer" },
                                            sell_method: { type: "string" },
                                            is_available: { type: "boolean" },
                                            sale_price: { type: "integer" },
                                            description: { type: "string" },
                                            file_name: { type: ["string", "null"] }
                                        }
                                    },
                                    quantity: { type: "integer" },
                                    price: { type: "integer" },
                                    total_price: { type: "integer" },
                                    created_at: { type: "string", format: "date-time" },
                                    updated_at: { type: "string", format: "date-time" }
                                }
                            }
                        },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    },
                    additionalProperties: false,
                    required: ['id', 'id_user', 'grand_total', 'CartDetail']
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getUserCartSchema, getUserCartController);

    const addCartDetailsSchema = {
        schema: {
            tags: ['cart'],
            body: {
                type: "object",
                properties: {
                    id_spare_part: { type: "integer" },
                    quantity: { type: "integer" },
                    price: { type: "integer" }
                },
                additionalProperties: false,
                required: ['id_spare_part', 'quantity', 'price']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_cart: { type: "integer" },
                        id_spare_part: { type: "integer" },
                        quantity: { type: "integer" },
                        price: { type: "integer" },
                        total_price: { type: "integer" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    additionalProperties: false,
                    required: ['id', 'id_cart', 'id_spare_part', 'quantity', 'total_price', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.post('/details', addCartDetailsSchema, addCartDetailsController)

    const cartCheckoutSchema = {
        schema: {
            tags: ['cart'],
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_user: { type: "integer" },
                        code: { type: "string" },
                        payment_method: { type: "integer" },
                        grand_total: { type: "integer" },
                        payment_date: { type: ["string", "null"], format: "date-time" },
                        expired_date: { type: ["string", "null"], format: "date-time" },
                        status: { type: "integer" },
                        snap_token: {type:"string"}
                    },
                    additionalProperties: false
                }
            }
        }
    }
    fastify.post('/checkout', cartCheckoutSchema, cartCheckoutController)

    const deleteCartDetailsSchema = {
        schema: {
            tags: ['cart'],
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
        preHandler: [fastify.authenticate]
    }
    fastify.delete('/details/:id', deleteCartDetailsSchema, deleteCartDetailController)

    next()
}

export default cartRoute;