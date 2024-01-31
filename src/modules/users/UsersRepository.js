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
        throw new Error(err.message);
    }
}

export async function createUser(inputs) {
    try {
        //insert conditional if user is created by admin, then set the role to whatever admin give. and status
        const hashedPassword = await hashPassword(inputs.password)
        let newUser = {
            ...inputs,
            password: hashedPassword,
            id_role: 2,
            status: false,
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