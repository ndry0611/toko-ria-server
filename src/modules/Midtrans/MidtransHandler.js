import { notificationHandlingController } from "./MidtransController.js"

async function midtransRoute(fastify, options, next) {
  const postNotificationSchema = {
    schema: {
      tags: ['midtrans'],
      body: {
        type: "object",
        properties: {
          transaction_time: { type: "string" },
          transaction_status: { type: "string" },
          transaction_id: { type: "string" },
          status_message: { type: "string" },
          status_code: { type: "string" },
          signature_key: { type: "string" },
          payment_type: { type: "string" },
          order_id: { type: "string" },
          gross_amount: { type: "string" },
          fraud_status: { type: "string" },
          currency: { type: "string" },
        }
      },
      response: {
        200: { type: "object" }
      }
    }
  }
  fastify.post("/handling", postNotificationSchema, notificationHandlingController)

  next()
}

export default midtransRoute;