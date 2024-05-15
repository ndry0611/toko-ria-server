import {
  getSalesController, getOneSaleController, cartCheckoutController, createCashSaleController, updateSaleController
} from './SalesController.js'

async function saleRoute(fastify, options, next) {
  const getSalesSchema = {
    schema: {
      tags: ['sale'],
      querystring: {
        type: "object",
        properties: {
          id_user: { type: "integer" },
          code: { type: "string" },
          payment_method: { type: "integer" },
          start_date: { type: "string", format: "date-time" },
          end_date: { type: "string", format: "date-time" },
          daftar: { type: "string", enum: ["penjualan", "pesanan"] },
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
              id_user: { type: "integer" },
              User: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" }
                }
              },
              code: { type: "string" },
              payment_method: { type: "integer" },
              grand_total: { type: "integer" },
              payment_date: { type: ["string", "null"], format: "date-time" },
              expired_date: { type: ["string", "null"], format: "date-time" },
              status: { type: "integer" },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" }
            },
            required: ['id', 'id_user', 'User', 'code', 'payment_method', 'grand_total', 'expired_date', 'status', 'created_at', 'updated_at']
          }
        }
      }
    },
    preHandler: [fastify.authenticate]
  }
  fastify.get('/', getSalesSchema, getSalesController);

  const getOneSaleSchema = {
    schema: {
      tags: ['sale'],
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
            id_user: { type: "integer" },
            User: {
              type: "object",
              properties: {
                name: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" }
              }
            },
            code: { type: "string" },
            payment_method: { type: "integer" },
            grand_total: { type: "integer" },
            payment_date: { type: ["string", "null"], format: "date-time" },
            expired_date: { type: ["string", "null"], format: "date-time" },
            status: { type: "integer" },
            SaleDetail: {
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
                }
              }
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" }
          },
          required: ['id', 'id_user', 'User', 'code', 'payment_method', 'grand_total', 'expired_date', 'status', 'SaleDetail', 'created_at', 'updated_at']
        }
      }
    },
    preHandler: [fastify.authenticate]
  }
  fastify.get('/:id', getOneSaleSchema, getOneSaleController);

  const createSaleSchema = {
    schema: {
      tags: ['sale'],
      body: {
        type: "object",
        properties: {
          id_user: { type: "integer" },
          code: { type: "string" },
          payment_method: { type: "integer" },
          grand_total: { type: "integer" },
          payment_date: { type: "string", format: "date-time" },
          expired_date: { type: "string", format: "date-time" },
          status: { type: "integer" },
          sale_detail: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id_spare_part: { type: "integer" },
                quantity: { type: "integer" },
                price: { type: "integer" },
                total_price: { type: "integer" }
              },
              additionalProperties: false,
              required: ['id_spare_part', 'quantity', 'price', 'total_price']
            }
          }
        },
        additionalProperties: false,
        required: ['id_user', 'code', 'payment_method', 'grand_total', 'status', 'sale_detail']
      },
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
            snapToken: { type: "string" }
          },
          additionalProperties: false,
          required: ['id', 'id_user', 'code', 'payment_method', 'grand_total', 'payment_date', 'expired_date', 'status']
        }
      }
    },
    preHandler: [fastify.authenticate]
  }
  fastify.post('/cart-checkout', createSaleSchema, cartCheckoutController)
  fastify.post('/create', { ...createSaleSchema, preHandler: [...createSaleSchema.preHandler, fastify.isAdmin] }, createCashSaleController);

  const updateSaleSchema = {
    schema: {
      tags: ['sale'],
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
          payment_date: { type: "string", format: "date-time" },
          expired_date: { type: "string", format: "date-time" },
          status: { type: "integer" }
        },
        additionalProperties: false
      },
      response: {
        200: {
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
            updated_at: { type: "string", format: "date-time" }
          },
          required: ['id', 'id_user', 'code', 'payment_method', 'grand_total', 'payment_date', 'expired_date', 'status', 'updated_at']
        }
      }
    },
    preHandler: [fastify.authenticate]
  }
  fastify.put('/:id', updateSaleSchema, updateSaleController);

  next()
}

export default saleRoute;