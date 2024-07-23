import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
    fastify.decorate('isAdmin', async (request, reply) => {
        const { user } = request;
        try {
            if (user.id_role != 1 && user.id_role != 3) {
                reply.code(403).send(Error("Internal access required"));
            }
            return;
        } catch (error) {
            reply.code(500).send(Error(error));
        }
    });

    fastify.decorate("isUserOrAdmin", async (request, reply) => {
        const { user } = request;
        try {
            if (user.id != request.params.id && user.id_role != 1) {
                reply.code(403).send(Error("You don't have access to data"));
            }
            return;
        } catch (error) {
            reply.code(500).send(Error(error));
        }
    });
})