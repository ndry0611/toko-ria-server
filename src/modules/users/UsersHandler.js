import { createUserController } from './UsersController.js'
import { UserSchema } from './userSchema.js';

async function userRoute(fastify, options, next) {
    // fastify.get('/', getAllUsers);

    fastify.post('/', createUserController);
    next()
}

export default userRoute