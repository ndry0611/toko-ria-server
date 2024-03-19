import {
    findCartByIdUser,
    addCartDetailIntoUserCart,
    checkCartDetailBelonging,
    deleteCartDetail
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