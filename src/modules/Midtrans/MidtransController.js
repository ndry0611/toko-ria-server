import { fastify } from "../../app.js";
import { snap } from "../../utils/snap.js";
import prisma from "../../utils/prisma.js";

export async function notificationHandlingController(request, reply) {
  const notificationJson = request.body;
  snap.transaction
    .notification(notificationJson)
    .then(async (statusResponse) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      let summary = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`;
      if (transactionStatus == "capture") {
        if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          const queries = {
            where: { code: orderId },
            data: {
              payment_date: new Date(statusResponse.transaction_time),
            },
          };
          const sale = await prisma.sale.update(queries);
          reply.code(200).send({ message: summary });
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        const queries = {
          where: { code: orderId },
          data: {
            payment_date: new Date(statusResponse.transaction_time),
          },
        };
        const sale = await prisma.sale.update(queries);
        reply.code(200).send({ message: summary });
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        const queries = {
          where: { code: orderId },
          data: {
            status: 3,
            expired_date: new Date(statusResponse.transaction_time),
          },
          include: { SaleDetail: true },
        };
        const sale = await prisma.sale.update(queries);

        await Promise.all(
          sale.SaleDetail.map(async (item) => {
            await prisma.sparePart.update({
              where: { id: item.id_spare_part },
              data: { stock: { increment: item.quantity } },
            });
          })
        );

        reply.code(200).send({ message: summary });
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
      }
      fastify.log.info(summary);
    });
}
