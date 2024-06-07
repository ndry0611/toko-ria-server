import {
    findCartByIdUser,
    addCartDetailIntoUserCart,
    checkCartDetailBelonging,
    deleteCartDetail,
    resetUserCart
} from './CartsRepository.js'
import { generateCode } from "../../utils/string.js";
import { findUserById } from '../User/UsersRepository.js';
import { createSale } from '../Sale/SalesRepository.js';
import { createSnapTransaction } from "../../utils/snap.js";

export async function getUserCartController(request, reply) {
    const user = request.user;
    try {
        const userCart = await findCartByIdUser(user.id)
        return reply.code(200).send(userCart);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }

}

export async function addCartDetailsController(request, reply) {
    const body = request.body;
    const user = request.user;
    try {
        const cartDetail = await addCartDetailIntoUserCart(user.id, body);
        return reply.code(201).send(cartDetail);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function cartCheckoutController(request, reply) {
    const userCred = request.user;
    const user = await findUserById(userCred.id);
    const cart = await findCartByIdUser(user.id);
    if (!cart || cart.CartDetail.length === 0) {
        return reply.code(400).send(Error("Daftar Belanja Tidak Boleh Kosong!"));
    }
    const itemsAvailable = checkAvailability(cart.CartDetail);
    if (itemsAvailable.error) {
        return reply.code(400).send(Error(itemsAvailable.error));
    }
    const grandTotal = cart.CartDetail.reduce((total, item) => {
        return total + item.total_price
    }, BigInt(0));

    const sale_detail = cart.CartDetail.map((item) => ({
        id_spare_part: item.id_spare_part,
        quantity: item.quantity,
        price: item.price,
        total_price: item.total_price
    }));

    const newSales = {
        id_user: user.id,
        code: generateCode(),
        payment_method: 2,
        grand_total: grandTotal,
        status: 1,
        payment_date: null,
        expired_date: new Date(now.getTime() + 10 * 60 * 1000),
        sale_detail: sale_detail,
    }

    // Midtrans Snap
    const item_details = cart.CartDetail.map((item) => ({
        id: item.id_spare_part.toString(),
        name: item.SparePart.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
    }));
    const midtransParams = {
        transaction_details: {
            order_id: newSales.code,
            gross_amount: Number(grandTotal)
        },
        item_details,
        customer_details: {
            first_name: user.name,
            phone: user.phone,
            shipping_address: {
                first_name: user.name,
                phone: user.phone,
                address: user.address
            }
        },
    }

    let snapToken;
    try {
        snapToken = await createSnapTransaction(midtransParams);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
    newSales.snap_token = snapToken;

    try {
        const sale = await createSale(newSales);
        await resetUserCart(user.id);
        return reply.code(201).send(sale);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

function checkAvailability(cartDetails) {
    const result = { status: false, error: null }
    for (const item of cartDetails) {
        if (item.SparePart.stock < item.quantity) {
            result.error = `Insufficient Stock for ${item.SparePart.name}`;
            return result;
        }
    }
    result.status = true;
    return result;
}

export async function deleteCartDetailController(request, reply) {
    const user = request.user;
    const cartDetail = await checkCartDetailBelonging(user.id, request.params.id)
    if (!cartDetail) {
        return reply.code(403).send(Error("You don't have access to data!"));
    }
    try {
        await deleteCartDetail(cartDetail);
        return reply.code(200).send({ message: `Cart Detail with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}