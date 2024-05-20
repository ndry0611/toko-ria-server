import 'dotenv/config';
import path from "path";
import { fileURLToPath } from 'url';
import Fastify from "fastify";
import formbody from '@fastify/formbody';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import fcors from '@fastify/cors';
import fastifyStatic from '@fastify/static';

import carRoute from "./modules/Car/CarsHandler.js";
import cartRoute from "./modules/Cart/CartsHandler.js";
import saleRoute from "./modules/Sale/SalesHandler.js";
import userRoute from "./modules/User/UsersHandler.js";
import fileRoute from './modules/File/FilesHandler.js';
import purchaseRoute from './modules/Purchase/PurchasesHandler.js';
import supplierRoute from './modules/Supplier/SuppliersHandler.js';
import carBrandRoute from './modules/CarBrand/CarBrandsHandler.js';
import categoryRoute from './modules/Category/CategoriesHandler.js';
import complaintRoute from './modules/Complaint/ComplaintsHandler.js';
import sparePartRoute from './modules/SparePart/SparePartsHandler.js';
import specialPriceRoute from './modules/SpecialPrice/SpecialPricesHandler.js'
import sparePartBrandRoute from './modules/SparePartBrand/SparePartBrandsHandler.js';
import stockAdjustmentRoute from './modules/StockAdjustment/StockAdjustmentsHandler.js';

import authenticate from "./middleware/authenticate.js";
import authorization from "./middleware/authorization.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const fastify = Fastify({
    logger: true
});

fastify.register(formbody);
fastify.register(fcors, [
    {
        origin: process.env.FRONT_END_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    {
        origin: "https://tokoriasigli.vercel.app/",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
]);
fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, "../public"),
    prefix: "/public/"
});
fastify.register(multipart);
fastify.register(swagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Toko Ria Sigli',
            description: 'API Documentation of Toko Ria Sigli',
            version: '1.0.0'
        },
        tags: [
            { name: 'auth', description: "Routes to get token for authentication / authorization" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
});
fastify.register(swaggerUi, { routePrefix: '/swagger/doc' });

fastify.register(authenticate)
fastify.register(authorization)

fastify.register(carRoute, { prefix: "api/v1/car" });
fastify.register(userRoute, { prefix: "api/v1/user" });
fastify.register(sparePartRoute, { prefix: "api/v1/spare-part" });
fastify.register(categoryRoute, { prefix: "api/v1/category" });
fastify.register(supplierRoute, { prefix: "api/v1/supplier" });
fastify.register(carBrandRoute, { prefix: "api/v1/car-brand" });
fastify.register(sparePartBrandRoute, { prefix: "api/v1/spare-part-brand" });
fastify.register(specialPriceRoute, { prefix: "api/v1/special-price" });
fastify.register(complaintRoute, { prefix: "api/v1/complaint" });
fastify.register(purchaseRoute, { prefix: "api/v1/purchase" });
fastify.register(saleRoute, { prefix: "api/v1/sale" });
fastify.register(cartRoute, { prefix: "api/v1/cart" });
fastify.register(fileRoute, { prefix: "api/v1/file" });
fastify.register(stockAdjustmentRoute, { prefix: "api/v1/stock-adjustment" });

async function start() {
    const port = process.env.PORT || 3000;
    try {
        await fastify.listen({ host: "0.0.0.0", port: port });
        fastify.swagger();
        fastify.log.info(`API is running on port ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start()