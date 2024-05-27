import {
    findAllSupplier,
    createSupplier,
    findSupplierById,
    updateSupplier,
    deleteSupplier
} from './SuppliersRepository.js'

export async function getAllSupplierController(request, reply) {
    const queries = { where: {}, orderBy: {id:"asc"} }
    const { name_keyword } = request.query;
    if (name_keyword) {
        queries.where.OR = [
            { company_name: { contains: name_keyword, mode: 'insensitive' } },
            { pic_name: { contains: name_keyword, mode: 'insensitive' } }
        ];
    }
    try {
        const suppliers = await findAllSupplier(queries);
        return reply.code(200).send(suppliers);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOneSupplierController(request, reply) {
    try {
        const supplier = await findSupplierById(request.params.id);
        return reply.code(200).send(supplier)
    } catch (error) {
        return reply.code(500).send(Error(error.message))
    }
}

export async function createSupplierController(request, reply) {
    const body = request.body;
    try {
        const supplier = await createSupplier(body);
        return reply.code(201).send(supplier);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateSupplierController(request, reply) {
    const body = request.body;
    if (!await findSupplierById(request.params.id)) {
        return reply.code(404).send(Error("Supplier is not found!"));
    }
    try {
        const supplier = await updateSupplier(request.params.id, body);
        return reply.code(200).send(supplier);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteSupplierController(request, reply) {
    try {
        await deleteSupplier(request.params.id);
        return reply.code(200).send({ message: `Supplier with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}