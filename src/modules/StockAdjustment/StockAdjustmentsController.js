import {
    findAllStockAdjustment,
    createStockAdjustment
} from './StockAdjustmentsRepository.js'
import { updateSparePart } from '../SparePart/SparePartsRepository.js'

export async function getAllStockAdjustmentController(request, reply) {
    const queries = {
        include: {
            SparePart: {
                include: { SparePartBrand: true }
            }
        },
        where: {}
    }
    const { id_spare_part, start_date, end_date } = request.query;
    if (id_spare_part) {
        queries.where.id_spare_part = id_spare_part;
    }
    if (start_date || end_date) {
        queries.where.created_at = {};
        if (start_date) {
            queries.where.created_at.gte = start_date
        };
        if (end_date) {
            queries.where.created_at.lte = end_date
        };

        queries.orderBy = {};
        queries.orderBy.created_at = 'asc';
    };

    try {
        const stockAdjustments = await findAllStockAdjustment(queries);
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