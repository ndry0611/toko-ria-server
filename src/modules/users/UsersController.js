import { createUser } from "./UsersRepository.js";
import yup from 'yup';
import { UserSchema } from './userSchema.js';

// export async function getAllUsers(request, reply) {
//     try {
//         reply.code(200).send('hello');
//     } catch (error) {
//         reply.code(500).send(error);
//     }
// }

export async function createUserController(request, reply) {
    const body = request.body;
    try {
        await UserSchema.createUserSchema.validate(body, { abortEarly: false });
        const user = await createUser(body);
        const response = {
            id: user.id,
            username: user.username,
            name: user.name,
            phone: user.phone,
            address: user.address,
            created_at: user.createdAt,
        }
        return reply.code(201).send(response);
    } catch (error) {
        reply.code(400)
        if (error instanceof yup.ValidationError) {
            console.error('Yup Validation Error:', error.errors);
            throw new Error(error.errors);
        }
        throw new Error(error.message);
    }

}