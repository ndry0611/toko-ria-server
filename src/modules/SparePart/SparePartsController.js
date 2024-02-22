import {
    findAllSparePart
} from './SparePartsRepository.js'

export async function getAllSparePartController(request, reply) {
    try {
        const spareParts = await findAllSparePart();
        return reply.code(200).send(spareParts);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}