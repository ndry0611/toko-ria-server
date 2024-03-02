import {
    findAllStockAdjustment,
    createStockAdjustment
} from './StockAdjustmentsRepository.js'
import { updateSparePart } from '../SparePart/SparePartsRepository.js'

export async function getAllStockAdjustmentController(request, reply) {
    try {
        const stockAdjustments = await findAllStockAdjustment();
        return reply.code(200).send(stockAdjustments)
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createStockAdjustmentAndUpdateSparePartStockController(request, reply) {
    const body = request.body;
    try {
        await updateSparePart(body.id_spare_part, { stock: body.new_quantity });
        const stockAdjustment = await createStockAdjustment(body);
        return reply.code(201).send(stockAdjustment)
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}