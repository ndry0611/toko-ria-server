import prisma from "../../utils/prisma.js";

export async function findManyCars(queries) {
    try {
        return await prisma.car.findMany(queries);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function findCarById(id) {
    try {
        return await prisma.car.findUnique({
            include: { CarBrand: true },
            where: { id: Number(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createCar(inputs) {
    try {
        const car = await prisma.car.create({
            data: inputs
        });
        return car;
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function updateCar(id, inputs) {
    try {
        const car = await prisma.car.update({
            where: {
                id: Number(id)
            },
            data: inputs
        });
        return car;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteCar(id) {
    try {
        await prisma.car.delete({
            where: { id: Number(id) }
        });
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}