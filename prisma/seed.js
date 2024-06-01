import prisma from '../src/utils/prisma.js';
import { hashPassword } from '../src/utils/bcrypt.js';


async function main() {
    await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'admin'
        }
    });
    await prisma.role.upsert({
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
                id_role: 1,
                username: 'admin',
                password: hash,
                phone: "081328282727",
                address: "Jalan Iskandar Muda No 5 Sigli",
                status: "ACTIVE"
            }
        });
    }

    await prisma.$executeRaw`COMMENT ON COLUMN suppliers.bank_account IS '(BANK)REKENING';`
    await prisma.$executeRaw`COMMENT ON COLUMN purchases.status IS '1=aktif,2=selesai,3=dibatalkan'`
    await prisma.$executeRaw`COMMENT ON COLUMN sales.payment_method IS '1=offline,2=online'`
    await prisma.$executeRaw`COMMENT ON COLUMN sales.status IS '1=packing,2=dikirim,3=dibatalkan,4=selesai'`
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