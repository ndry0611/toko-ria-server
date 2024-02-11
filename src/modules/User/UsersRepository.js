import prisma from '../../utils/prisma.js'
import { hashPassword } from '../../utils/bcrypt.js';

export async function findAllUser() {
    try {
        const allUser = await prisma.user.findMany({
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
            }
        });
        return allUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findUserByUsername(username) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createUser(inputs) {
    try {
        const hashedPassword = await hashPassword(inputs.password)
        let newUser = {
            ...inputs,
            password: hashedPassword,
        }
        const user = await prisma.user.create({
            data: newUser
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateUser(id, inputs) {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: inputs
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteUser(id) {
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}