import { snap } from "../../utils/snap.js";

export async function notificationHandlingController(request, reply) {
  const notificationJson = request.body;
  snap.transaction.notification(notificationJson)
    .then((statusResponse) => {
      let orderId = statusResponse.order_id
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      let summary = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`;
      if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
        }
      } else if (transactionStatus == 'settlement') {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
      } else if (transactionStatus == 'cancel' ||
        transactionStatus == 'deny' ||
        transactionStatus == 'expire') {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
      } else if (transactionStatus == 'pending') {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
      }
      console.log(summary)
      reply.code(200).send({message: summary});
    });
}