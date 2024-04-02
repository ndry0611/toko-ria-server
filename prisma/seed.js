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
                status: true
            }
        });
    }

    await prisma.$executeRaw(`COMMENT ON COLUMN suppliers.bank_account IS '(BANK)REKENING';`)
    await prisma.$executeRaw(`COMMENT ON COLUMN spare_parts.sell_method IS '0=pcs,1=set';`)
    await prisma.$executeRaw(`COMMENT ON COLUMN purchases.status IS '0=aktif,1=selesai,2=dibatalkan'`)
    await prisma.$executeRaw(`COMMENT ON COLUMN sales.payment_method IS '0=offline,1=online'`)
    await prisma.$executeRaw(`COMMENT ON COLUMN sales.status IS '0=packing,1=dikirim,2=dibatalkan,3=selesai'`)
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