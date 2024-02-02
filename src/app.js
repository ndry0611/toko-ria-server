import 'dotenv/config';
import Fastify from "fastify";
import userRoute from "./modules/users/UsersHandler.js";
import carRoute from "./modules/cars/CarsHandler.js";
import authenticate from "./middleware/authenticate.js";
import authorization from "./middleware/authorization.js";

export const fastify = Fastify({
    logger: true
})

fastify.register(authenticate)
fastify.register(authorization)

fastify.register(userRoute, { prefix: "/user" });
fastify.register(carRoute, { prefix: "/car" });

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