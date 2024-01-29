import prisma from '../src/utils/prisma.js';
import { hashPassword } from '../src/utils/bcrypt.js';


async function main() {
    const admin = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'admin'
        }
    });
    const customer = await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'customer'
        }
    });

    const userAdmin = await prisma.user.findUnique({
        where: { id: 1 }
    });
    if (!userAdmin) {
        const hash = await hashPassword(process.env.ADMIN_PASSWORD);
        await prisma.user.create({
            data: {
                name: 'admin',
                idRole: 1,
                username: 'admin',
                password: hash,
                phone: "081328282727",
                address: "Jalan Iskandar Muda No 5 Sigli",
                status: true
            }
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })