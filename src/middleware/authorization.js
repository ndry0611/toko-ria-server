import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
    fastify.decorate('isAdmin', async (request, reply) => {
        const { user } = request;
        try {
            if (user.id_role != 1) {
                reply.code(403).send(Error("Admin access required"));
            }
            return;
        } catch (error) {
            reply.code(500).send(Error(error));
        }
    });
})