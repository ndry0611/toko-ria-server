import prisma from '../src/utils/prisma.js';

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
    console.log({ admin, customer })
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