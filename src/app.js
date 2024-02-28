import 'dotenv/config';
import Fastify from "fastify";
import formbody from '@fastify/formbody';
import multipart from '@fastify/multipart';

import carRoute from "./modules/Car/CarsHandler.js";
import userRoute from "./modules/User/UsersHandler.js";
import fileRoute from './modules/File/FilesHandler.js';
import supplierRoute from './modules/Supplier/SuppliersHandler.js';
import carBrandRoute from './modules/CarBrand/CarBrandsHandler.js';
import categoryRoute from './modules/Category/CategoriesHandler.js';
import sparePartRoute from './modules/SparePart/SparePartsHandler.js';
import specialPriceRoute from './modules/SpecialPrice/SpecialPricesHandler.js'
import sparePartBrandRoute from './modules/SparePartBrand/SparePartBrandsHandler.js';

import authenticate from "./middleware/authenticate.js";
import authorization from "./middleware/authorization.js";

export const fastify = Fastify({
    logger: true
})
fastify.register(formbody);
fastify.register(multipart);

fastify.register(authenticate)
fastify.register(authorization)

fastify.register(fileRoute, {prefix: "api/v1/file"});
fastify.register(carRoute, { prefix: "api/v1/car" });
fastify.register(userRoute, { prefix: "/api/v1/user" });
fastify.register(supplierRoute, {prefix: "api/v1/supplier"});
fastify.register(carBrandRoute, { prefix: "api/v1/car-brand" });
fastify.register(categoryRoute, { prefix: "api/v1/category" });
fastify.register(sparePartRoute, {prefix: "api/v1/spare-part"});
fastify.register(specialPriceRoute, {prefix: "api/v1/special-price"});
fastify.register(sparePartBrandRoute, {prefix: "api/v1/spare-part-brand"});

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