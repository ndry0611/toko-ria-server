import {
    findAllSparePartBrands,
    findSparePartBrandById,
    createSparePartBrand,
    updateSparePartBrand,
    deleteSparePartBrand
} from './SparePartBrandsRepository.js'

export async function getAllSparePartBrandController(request, reply) {
    try {
        const sparePartBrands = await findAllSparePartBrands();
        return reply.code(200).send(sparePartBrands);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createSparePartBrandController(request, reply) {
    const body = request.body;
    try {
        const sparePartBrand = await createSparePartBrand(body);
        return reply.code(201).send(sparePartBrand);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateSparePartBrandController(request, reply) {
    const body = request.body;
    if (!await findSparePartBrandById(request.params.id)) {
        return reply.code(404).send(Error("Spare Part Brand is not found!"));
    }
    try {
        const sparePartBrand = await updateSparePartBrand(request.params.id, body);
        return reply.code(200).send(sparePartBrand)
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteSparePartBrandController(request, reply) {
    try {
        await deleteSparePartBrand(request.params.id);
        return reply.code(200).send({ message: `Spare Part Brand with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}