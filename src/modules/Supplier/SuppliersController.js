import {
    findAllSupplier
} from './SuppliersRepository.js'

export async function getAllSupplierController(request, reply) {
    try {
        const suppliers = await findAllSupplier();
        reply.code(200).send(suppliers);
    } catch (error) {
        reply.code(500).send(Error(error.message));
    }
}