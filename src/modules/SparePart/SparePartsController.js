import {
    findAllSparePart,
    findSparePartById,
    createSparePart,
    updateSparePart,
    deleteSparePart
} from './SparePartsRepository.js'

export async function getAllSparePartController(request, reply) {
    const queries = {
        where: {},
        include: {
            SparePartBrand: true,
            Car: {
                include: { CarBrand: true }
            }
        },
        orderBy: {id: "asc"}
    };
    const { id_category, id_car_brand, id_car, name } = request.query;

    if (id_category) {
        queries.where.id_category = id_category;
    };

    if (id_car) {
        queries.where.id_car = id_car;
    };

    if (id_car_brand) {
        queries.where.Car = { id_car_brand };
    };

    if (name) {
        queries.where.name = { contains: name, mode: "insensitive" }
    }

    try {
        const spareParts = await findAllSparePart(queries);
        return reply.code(200).send(spareParts);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOneSparePartController(request, reply) {
    try {
        const sparePart = await findSparePartById(request.params.id);
        return reply.code(200).send(sparePart)
    } catch (error) {
        return reply.code(500).send(Error(error.message))
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