import prisma from '../../utils/prisma.js'
import { hashPassword } from '../../utils/bcrypt.js';

export async function getAllUser() {
    try {
        const allUser = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                phone: true,
                address: true,
                status: true,
                idRole: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return allUser;
    } catch (err) {
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
            idRole: 2,
            status: false,
        }
        const user = await prisma.user.create({
            data: newUser
        });
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}