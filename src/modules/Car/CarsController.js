import {
    findManyCars,
    findCarById,
    createCar,
    updateCar,
    deleteCar
} from './CarsRepository.js';

export async function getAllCarController(request, reply) {
    const queries = { include: { CarBrand: true }, where: {} };
    const { id_car_brand, name, production_year } = request.query;

    if (name) {
        queries.where.name = { contains: name }
    }

    if (id_car_brand) {
        queries.where.id_car_brand = id_car_brand;
    }

    if (production_year) {
        queries.where.production_year = { contains: production_year };
    }

    try {
        const cars = await findManyCars(queries);
        return reply.code(200).send(cars);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOneCarController(request, reply) {
    try {
        const car = await findCarById(request.params.id);
        if (!car) {
            return reply.code(404).send(Error("Car is not found!"));
        }
        return reply.code(200).send(car);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createCarController(request, reply) {
    const body = request.body;
    try {
        const car = await createCar(body);
        return reply.code(201).send(car);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function updateCarController(request, reply) {
    const body = request.body;
    if (!await findCarById(request.params.id)) {
        return reply.code(404).send(Error("Car is not found!"));
    }
    try {
        const car = await updateCar(request.params.id, body);
        return reply.code(200).send(car);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function deleteCarController(request, reply) {
    try {
        await deleteCar(request.params.id);
        return reply.code(200).send({ message: `Car with id: ${request.params.id} successfully deleted` });
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}