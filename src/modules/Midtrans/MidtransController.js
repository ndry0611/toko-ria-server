import { handlingNotification } from "../../utils/snap.js";

export async function notificationHandlingController(request, reply) {
  const body = request.body;
  await handlingNotification(body);
  return reply.code(200).send({message: "integration test"});
}