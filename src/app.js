import Fastify from "fastify";
import userRoute from "./modules/users/UsersHandler.js";
import fjwt from '@fastify/jwt';
import 'dotenv/config';

export const fastify = Fastify({
    logger: true
})

fastify.register(fjwt, {
    secret: process.env.JWT_SECRET
});

fastify.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        return reply.send(error)
    }
});

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