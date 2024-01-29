import {
    createUser,
    getAllUser
} from "./UsersRepository.js";

export async function getAllUserController(request, reply) {
    try {
        const users = await getAllUser();
        const response = users.map(({ idRole, createdAt, updatedAt, ...rest }) => ({
            ...rest,
            id_role: idRole,
            created_at: createdAt,
            updated_at: updatedAt,
        }));
        reply.code(200).send(response);
    } catch (error) {
        reply.code(500).send(error);
    }
}

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
        reply.code(500)
        throw new Error(error.message);
    }
}