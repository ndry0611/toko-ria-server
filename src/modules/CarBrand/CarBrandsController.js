import {
    createCarBrand,
    findAllCarBrand,
    findCarBrandById,
    updateCarBrand,
    deleteCarBrand
} from "./CarBrandsRepository.js";


export async function getAllCarBrandController(request, reply) {
    try {
        const carBrands = await findAllCarBrand();
        return reply.code(200).send(carBrands);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOneCarBrandController(request, reply) {
    try {
        const carBrand = await findCarBrandById(request.params.id);
        if (!carBrand) {
            return reply.code(404).send(Error("Car Brand is not found!"));
        }
        return reply.code(200).send(carBrand)
    } catch (error) {
        return reply.code(500).send(Error(error.message))
    }
}

export async function createCarBrandController(request, reply) {
    const body = request.body;
    try {
        const carBrand = await createCarBrand(body);
        return reply.code(201).send(carBrand);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateCarBrandController(request, reply) {
    const body = request.body;
    if (!await findCarBrandById(request.params.id)) {
        return reply.code(404).send(Error("Car Brand is not found!"));
    }
    try {
        const carBrand = await updateCarBrand(request.params.id, body);
        return reply.code(200).send(carBrand);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteCarBrandController(request, reply) {
    try {
        await deleteCarBrand(request.params.id);
        return reply.code(200).send({ message: `Car Brand with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}