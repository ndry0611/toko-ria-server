import {
    createUser,
    findAllUser,
    findUserByUsername,
    updateUser
} from "./UsersRepository.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { fastify } from "../../app.js";

export async function getAllUserController(request, reply) {
    try {
        const users = await findAllUser();
        reply.code(200).send(users);
    } catch (error) {
        reply.code(500).send(Error(error.message));
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
            created_at: user.created_at,
        }
        return reply.code(201).send(response);
    } catch (error) {
        reply.code(500).send(Error(error.message));
    }
}

export async function loginController(request, reply) {
    const body = request.body;
    try {
        const user = await findUserByUsername(body.username)
        if (!user) {
            return reply.code(401).send(Error("Username is not found!"));
        }

        const isCorrect = await comparePassword(body.password, user.password);
        if (!isCorrect) {
            return reply.code(401).send(Error("Wrong Password!"));
        }

        if (!user.status) {
            return reply.code(403).send(Error("Account is not active!"));
        }

        const payload = {
            id: user.id,
            id_role: user.id_role,
            status: user.status,
            exp: Math.floor(Date.now() / 1000) + 3600
        }
        return reply.code(200).send({ token: fastify.jwt.sign(payload) });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateUserController(request, reply) {
    const body = request.body;

    if (typeof body.status !== undefined) {
        if (request.user.id_role != 1) {
            delete body.status;
        }
    }
    
    try {
        const user = await updateUser(request.params.id, body);
        const response = {
            id: user.id,
            username: user.username,
            name: user.name,
            phone: user.phone,
            address: user.address,
            status: user.status,
            updated_at: user.updated_at
        };
        return reply.code(200).send(response);
    } catch (error) {
        return reply.code(500).send(Error(error.message))
    }
}