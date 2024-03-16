import prisma from "../../utils/prisma.js";

export async function findCartByIdUser(id_user) {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                id_user: id_user
            },
            include: {
                CartDetail: {
                    include: {
                        SparePart: {
                            include: {
                                SparePartBrand: true,
                                Car: true
                            }
                        }
                    }
                }
            }
        });
        if (cart.CartDetail.length > 0) {
            await Promise.all(cart.CartDetail.map(async (cDetail) => {
                // Find File
                const file = await prisma.file.findFirst({
                    where: {
                        file_model: "spare_parts",
                        file_id: cDetail.id_spare_part
                    }
                });
                cDetail.SparePart.file_name = file ? file.name : null
            }));
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function addCartDetailIntoUserCart(userId, inputs) {
    try {
        //Check if cart exists
        const userCart = await prisma.cart.upsert({
            where: { id_user: userId },
            update: {},
            create: { id_user: userId }
        });
        inputs.id_cart = userCart.id

        //Look after special Price
        const specialPrice = await prisma.specialPrice.findFirst({
            where: {
                id_spare_part: inputs.id_spare_part,
                id_user: userId
            },
            orderBy: { price: 'asc' }
        });
        if (specialPrice) {
            inputs.price = specialPrice.price
        }
        inputs.total_price = Number(inputs.price) * Number(inputs.quantity)

        const cartDetails = await prisma.cartDetail.create({
            data: inputs
        });

        //Update the cart grand_total
        await prisma.cart.update({
            where: { id: userCart.id },
            data: { grand_total: { increment: inputs.total_price } }
        });

        return cartDetails;
    } catch (error) {
        throw new Error(error.message)
    }
}