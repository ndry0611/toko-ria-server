import Fastify from "fastify";
import userRoute from "./modules/users/UsersHandler.js";
import 'dotenv/config'

const fastify = Fastify({
    logger: true
})

fastify.register(userRoute, { prefix: "/user" });

async function start() {
    try {
        await fastify.listen({ port: process.env.PORT });
        fastify.log.info(`API is running on port ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start()