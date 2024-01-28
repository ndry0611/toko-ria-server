import { createUserController } from './UsersController.js'

async function userRoute(fastify, options, next) {
    // fastify.get('/', getAllUsers);

    fastify.post('/', createUserController);
    next()
}

export default userRoute