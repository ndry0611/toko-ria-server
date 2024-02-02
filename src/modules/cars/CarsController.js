import {
    findAllCar,
    findCarById,
    createCar,
    updateCar,
    deleteCar
} from './CarsRepository.js';

export async function getAllCarController(request, reply) {
    try {
        const cars = await findAllCar();
        reply.code(200).send(cars);
    } catch (error) {
        reply.code(500).send(Error(error.message));
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