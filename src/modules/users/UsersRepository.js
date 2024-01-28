import prisma from '../../utils/prisma.js'


export async function createUser(inputs) {
    try {
        const user = await prisma.user.create({
            data: inputs
        });
        return user;
    } catch (err) {
        console.error('Prisma Error:', err.message);
        throw new Error('Error creating user');
    }
}