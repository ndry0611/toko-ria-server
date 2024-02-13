import {
    findAllSupplier,
    createSupplier
} from './SuppliersRepository.js'

export async function getAllSupplierController(request, reply) {
    try {
        const suppliers = await findAllSupplier();
        return reply.code(200).send(suppliers);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createSupplierController(request,reply) {
    const body = request.body;
    try {
        const supplier = await createSupplier(body);
        return reply.code(201).send(supplier);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}