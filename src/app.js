import 'dotenv/config';
import Fastify from "fastify";
import formbody from '@fastify/formbody';
import multipart from '@fastify/multipart';

import userRoute from "./modules/User/UsersHandler.js";
import carRoute from "./modules/Car/CarsHandler.js";
import carBrandRoute from './modules/CarBrand/CarBrandsHandler.js';
import categoryRoute from './modules/Category/CategoriesHandler.js';
import supplierRoute from './modules/Supplier/SuppliersHandler.js';
import fileRoute from './modules/File/FilesHandler.js';

import authenticate from "./middleware/authenticate.js";
import authorization from "./middleware/authorization.js";

export const fastify = Fastify({
    logger: true
})
fastify.register(formbody);
fastify.register(multipart);

fastify.register(authenticate)
fastify.register(authorization)

fastify.register(userRoute, { prefix: "/api/v1/user" });
fastify.register(carRoute, { prefix: "api/v1/car" });
fastify.register(carBrandRoute, { prefix: "api/v1/car-brand" });
fastify.register(categoryRoute, { prefix: "api/v1/category" });
fastify.register(supplierRoute, {prefix: "api/v1/supplier"});
fastify.register(fileRoute, {prefix: "api/v1/file"});

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