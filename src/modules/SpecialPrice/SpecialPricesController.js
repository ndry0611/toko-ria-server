import {
    findManySpecialPriceBySparePartId,
    createSpecialPrice,
    deleteSpecialPrice
} from './SpecialPricesRepository.js'

export async function getSpecialPriceBySparePartIdController(request, reply) {
    const sparePartId = request.params.sparePartId
    try {
        const specialPrices = await findManySpecialPriceBySparePartId(sparePartId);
        return reply.code(200).send(specialPrices);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createSpecialPriceController(request, reply) {
    const body = request.body;
    try {
        const specialPrice = await createSpecialPrice(body);
        return reply.code(201).send(specialPrice);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteSpecialPriceController(request, reply) {
    try {
        await deleteSpecialPrice(request.params.id);
        return reply.code(200).send({ message: `Special Price with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}