import prisma from '../../utils/prisma.js'


export async function createUser(inputs) {
    try {
        //insert conditional if user is created by admin, then set the role to whatever admin give. and status
        let newUser = {
            ...inputs,
            idRole: 2,
            status: false,
        }
        const user = await prisma.user.create({
            data: newUser
        });
        return user;
    } catch (err) {
        console.error('Prisma Error:', err.message);
        throw new Error('Error creating user');
    }
}