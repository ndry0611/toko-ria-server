import {
    createUser,
    findAllUser,
    findUserByUsername,
    findUserById,
    updateUser,
    deleteUser
} from "./UsersRepository.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { fastify } from "../../app.js";

export async function getAllUserController(request, reply) {
    const queries = {
        select: {
            id: true,
            username: true,
            name: true,
            phone: true,
            address: true,
            status: true,
            id_role: true,
            created_at: true,
            updated_at: true
        }, where: {}
    };
    const { name, status } = request.query;
    if (name) {
        queries.where.name = { contains: name, mode: "insensitive" };
    }
    if (status !== undefined && status !== null) {
        queries.where.status = status;
    };
    try {
        const users = await findAllUser(queries);
        reply.code(200).send(users);
    } catch (error) {
        reply.code(500).send(Error(error.message));
    }
}

export async function registerController(request, reply) {
    const body = request.body;
    body.id_role = 2;
    body.status = false;
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

export async function createUserController(request, reply) {
    const body = request.body;
    body.status = true;
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

    if (!await findUserById(request.params.id)) {
        return reply.code(404).send(Error("User is not found!"));
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

export async function deleteUserController(request, reply) {
    try {
        await deleteUser(request.params.id);
        return reply.code(200).send({ message: `User with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message))
    }
}