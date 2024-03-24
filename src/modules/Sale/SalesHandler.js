import {
  getSalesController
} from './SalesController.js'

async function saleRoute(fastify, options, next) {
  const getSalesSchema = {
    schema: {
      querystring: {
        type: "object",
        properties: {
          id_user: { type: "integer" },
          code: { type: "string" },
          payment_method: { type: "integer" },
          start_date: { type: "string", format: "date-time" },
          end_date: { type: "string", format: "date-time" },
          daftar: { type: "string", enum: ["penjualan", "pesanan"] }
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
    preHandler: [fastify.authenticate, fastify.isAdmin]
  }
  fastify.get('/', getSalesSchema, getSalesController);

  const createSaleSchema = {
    schema: {
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
      }
    },
    preHandler: [fastify.authenticate]
  }
  fastify.post('/cart-checkout', createSaleSchema, cartCheckoutController)
  fastify.post('/create', { ...createSaleSchema, preHandler: [...createSaleSchema.preHandler, fastify.isAdmin] }, createCashSaleController);

  const updateSaleSchema = {
    schema: {
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
}