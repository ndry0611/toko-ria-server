import {
    findAllSparePart,
    findSparePartById,
    createSparePart,
    updateSparePart,
    deleteSparePart
} from './SparePartsRepository.js'

export async function getAllSparePartController(request, reply) {
    try {
        const spareParts = await findAllSparePart();
        return reply.code(200).send(spareParts);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createSparePartController(request, reply) {
    const body = request.body;
    try {
        const sparePart = await createSparePart(body);
        return reply.code(201).send(sparePart);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateSparePartController(request, reply) {
    const body = request.body;
    if (!await findSparePartById(request.params.id)) {
        return reply.code(404).send(Error("Spare Part is not found!"));
    }
    try {
        const sparePart = await updateSparePart(request.params.id, body);
        return reply.code(200).send(sparePart);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deletSparePartController(request, reply) {
    try {
        await deleteSparePart(request.params.id);
        return reply.code(200).send({ message: `Spare Part with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}