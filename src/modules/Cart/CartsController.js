import {
    findCartByIdUser,
    addCartDetailIntoUserCart
} from './CartsRepository.js'

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