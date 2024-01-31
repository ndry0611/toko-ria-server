import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';

export default fp(async (fastify, opts) => {
    fastify.register(fjwt, {
        secret: process.env.JWT_SECRET
    });

    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.send(error);
        }
    });
})