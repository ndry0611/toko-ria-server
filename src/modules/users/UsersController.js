import { createUser } from "./UsersRepository.js";

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
        throw new Error(error.message);
    }

}