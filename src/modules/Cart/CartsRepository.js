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
                                Car: {
                                    include: { CarBrand: true }
                                }
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

export async function checkCartDetailBelonging(userId, cartDetailId) {
    try {
        const cart = await prisma.cart.findUnique({
            where: { id_user: userId }
        });
        const cartDetail = await prisma.cartDetail.findUnique({
            where: {
                id: cartDetailId,
                id_cart: cart.id
            }
        });
        if (!cartDetail) {
            return null;
        }
        return cartDetail;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function addCartDetailIntoUserCart(userId, inputs) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
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

            //Check if cart had the same spare_part
            const existingCartDetails = await prisma.cartDetail.findFirst({
                where: {
                    id_cart: userCart.id,
                    id_spare_part: inputs.id_spare_part
                }
            });

            //if yes, modify the quantity and total_price
            if (existingCartDetails) {
                const updatedCartDetail = await prisma.cartDetail.update({
                    where: { id: existingCartDetails.id },
                    data: {
                        quantity: { increment: inputs.quantity },
                        total_price: { increment: inputs.total_price }
                    }
                });

                //Update the cart grand_total
                await prisma.cart.update({
                    where: { id: userCart.id },
                    data: { grand_total: { increment: inputs.total_price } }
                });

                return updatedCartDetail;

            } else {
                //if no, create a new cartDetail
                const newCartDetail = await prisma.cartDetail.create({
                    data: inputs
                });
                //Update the cart grand_total
                await prisma.cart.update({
                    where: { id: userCart.id },
                    data: { grand_total: { increment: inputs.total_price } }
                });
                return newCartDetail;
            }
        });
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteCartDetail(cartDetail) {
    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.cart.update({
                where: { id: cartDetail.id_cart },
                data: { grand_total: { decrement: cartDetail.total_price } }
            });
            await prisma.cartDetail.delete({
                where: { id: Number(cartDetail.id) }
            });
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function resetUserCart(userId) {
    try {
        const cart = await prisma.cart.update({
            where: { id_user: userId },
            data: { grand_total: 0 }
        });
        await prisma.cartDetail.deleteMany({
            where: { id_cart: cart.id }
        });
        return
    } catch (error) {
        throw new Error(error.message);
    }
}