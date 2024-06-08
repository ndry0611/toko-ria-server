import 'dotenv/config';
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEYS_MT,
  clientKey: process.env.CLIENT_KEYS_MT
});

export async function createSnapTransaction(parameter) {
  try {
    const transaction = await snap.createTransaction(parameter);
    if (transaction.error_message) throw transaction.error_message;
    return transaction.token;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function handlingNotification(notificationJson) {
  await snap.transaction.notification(notificationJson)
    .then((statusResponse) => {
      let orderId = statusResponse.order_id
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
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
    });
}