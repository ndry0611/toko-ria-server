import prisma from '../../utils/prisma.js'
import { hashPassword } from '../../utils/bcrypt.js';
import * as fs from 'fs'
import * as path from 'path'

export async function findAllUser(queries) {
    try {
        const allUser = await prisma.user.findMany(queries);
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
        if (user) {
            const userPhoto = await prisma.file.findFirst({
                where: {
                    file_model: "users",
                    file_id: user.id
                }
            });
            user.file_name = userPhoto ? userPhoto.name : null;
        }
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
        if(error.code && error.code === "P2002") {
            throw new Error("Username is already exist!");
        }
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
        const userPhoto = await prisma.file.findFirst({
            where: {
                file_model: "users",
                file_id: id
            }
        });
        if (userPhoto) {
            fs.unlinkSync(path.join('public/uploads/users', userPhoto.name));
        }
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}