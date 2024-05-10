import {
    getAllSparePartController,
    getOneSparePartController,
    createSparePartController,
    updateSparePartController,
    deletSparePartController
} from "./SparePartsController.js"

async function sparePartRoute(fastify, options, next) {
    const getAllSparePartSchema = {
        schema: {
            tags: ['spare-part'],
            querystring: {
                type: "object",
                properties: {
                    id_category: { type: "integer" },
                    id_car_brand: { type: "integer" },
                    id_car: { type: "integer" },
                    name: { type: "string" }
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
                            id_spare_part_brand: { type: "integer" },
                            SparePartBrand: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    manufacture: { type: "string" }
                                }
                            },
                            id_category: { type: ["integer", "null"] },
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
                            id_supplier: { type: ["integer", "null"] },
                            name: { type: "string" },
                            part_no: { type: "string" },
                            genuine: { type: "boolean" },
                            stock: { type: "integer", minimum: 0 },
                            capital_price: { type: "integer" },
                            sell_method: { type: "integer" },
                            is_available: { type: "boolean" },
                            sale_price: { type: "integer" },
                            description: { type: "string" },
                            supply_date: { type: "string", format: "date-time" },
                            file_name: { type: ["string", "null"] },
                            created_at: { type: "string", format: "date-time" },
                            updated_at: { type: "string", format: "date-time" }
                        },
                        required: ['id', 'id_spare_part_brand', 'id_category', 'id_car', 'id_supplier', 'name', 'part_no', 'genuine', 'stock', 'capital_price', 'sell_method', 'is_available', 'sale_price', 'description', 'supply_date', 'created_at', 'updated_at']
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.get('/', getAllSparePartSchema, getAllSparePartController);

    const getOneSparePartSchema = {
        schema: {
            tags: ['spare-part'],
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
                        id_spare_part_brand: { type: "integer" },
                        SparePartBrand: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                manufacture: { type: "string" }
                            }
                        },
                        id_category: { type: ["integer", "null"] },
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
                        id_supplier: { type: ["integer", "null"] },
                        name: { type: "string" },
                        part_no: { type: "string" },
                        genuine: { type: "boolean" },
                        stock: { type: "integer", minimum: 0 },
                        capital_price: { type: "integer" },
                        sell_method: { type: "integer" },
                        is_available: { type: "boolean" },
                        sale_price: { type: "integer" },
                        description: { type: "string" },
                        supply_date: { type: "string", format: "date-time" },
                        file_name: { type: ["string", "null"] },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.get('/:id', getOneSparePartSchema, getOneSparePartController)

    const createSparePartSchema = {
        schema: {
            tags: ['spare-part'],
            body: {
                type: "object",
                properties: {
                    id_spare_part_brand: { type: "integer" },
                    id_category: { type: "integer" },
                    id_car: { type: "integer" },
                    id_supplier: { type: "integer" },
                    name: { type: "string" },
                    part_no: { type: "string" },
                    genuine: { type: "boolean" },
                    stock: { type: "integer", minimum: 0 },
                    capital_price: { type: "integer" },
                    sell_method: { type: "integer" },
                    is_available: { type: "boolean" },
                    sale_price: { type: "integer" },
                    description: { type: "string" },
                    supply_date: { type: "string", format: "date-time" },
                },
                additionalProperties: false,
                required: ['id_spare_part_brand', 'id_category', 'name', 'part_no', 'genuine', 'stock', 'capital_price', 'sell_method', 'is_available', 'sale_price', 'description', 'supply_date']
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_spare_part_brand: { type: "integer" },
                        id_category: { type: ["integer", "null"] },
                        id_car: { type: ["integer", "null"] },
                        id_supplier: { type: ["integer", "null"] },
                        name: { type: "string" },
                        part_no: { type: "string" },
                        genuine: { type: "boolean" },
                        stock: { type: "integer", minimum: 0 },
                        capital_price: { type: "integer" },
                        sell_method: { type: "integer" },
                        is_available: { type: "boolean" },
                        sale_price: { type: "integer" },
                        description: { type: "string" },
                        supply_date: { type: "string", format: "date-time" },
                        created_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'id_spare_part_brand', 'id_category', 'name', 'part_no', 'genuine', 'stock', 'capital_price', 'sell_method', 'is_available', 'sale_price', 'description', 'supply_date', 'created_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/', createSparePartSchema, createSparePartController);

    const updateSparePartSchema = {
        schema: {
            tags: ['spare-part'],
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
                    id_spare_part_brand: { type: "integer" },
                    id_category: { type: "integer" },
                    id_car: { type: "integer" },
                    id_supplier: { type: "integer" },
                    name: { type: "string" },
                    part_no: { type: "string" },
                    genuine: { type: "boolean" },
                    stock: { type: "integer", minimum: 0 },
                    capital_price: { type: "integer" },
                    sell_method: { type: "integer" },
                    is_available: { type: "boolean" },
                    sale_price: { type: "integer" },
                    description: { type: "string" },
                    supply_date: { type: "string", format: "date-time" },
                },
                additionalProperties: false,
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        id_spare_part_brand: { type: "integer" },
                        id_category: { type: ["integer", "null"] },
                        id_car: { type: ["integer", "null"] },
                        id_supplier: { type: ["integer", "null"] },
                        name: { type: "string" },
                        part_no: { type: "string" },
                        genuine: { type: "boolean" },
                        stock: { type: "integer", minimum: 0 },
                        capital_price: { type: "integer" },
                        sell_method: { type: "integer" },
                        is_available: { type: "boolean" },
                        sale_price: { type: "integer" },
                        description: { type: "string" },
                        supply_date: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                    required: ['id', 'id_spare_part_brand', 'id_category', 'name', 'part_no', 'genuine', 'stock', 'capital_price', 'sell_method', 'is_available', 'sale_price', 'description', 'supply_date', 'updated_at']
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.put('/:id', updateSparePartSchema, updateSparePartController);

    const deleteSparePartSchema = {
        schema: {
            tags: ['spare-part'],
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
    fastify.delete('/:id', deleteSparePartSchema, deletSparePartController);

    next()
}

export default sparePartRoute