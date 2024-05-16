import {
    findManySpecialPrice,
    createSpecialPrice,
    deleteSpecialPrice
} from './SpecialPricesRepository.js'

export async function getSpecialPriceController(request, reply) {
    const { id_spare_part, id_user } = request.query
    const queries = {
        where: {},
        include: { User: true, SparePart: true }
    }
    if (id_spare_part) {
        queries.where.id_spare_part = id_spare_part
    }
    if (id_user) {
        queries.where.id_user = id_user
    }
    try {
        const specialPrices = await findManySpecialPrice(queries);
        return reply.code(200).send(specialPrices);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getSpecialPriceBySparePartIdController(request, reply) {
    const queries = {
        where: {
            id_spare_part: request.params.sparePartId
        },
        include: { User: true, SparePart: true }
    }
    try {
        const specialPrices = await findManySpecialPrice(queries);
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