import 'dotenv/config';
import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
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