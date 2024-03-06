import {
    findManyPurchases
} from './PurchasesRepository.js'

export async function getPurchasesController(request, reply) {
    const queries = { include: { Supplier: true }, where: {} };
    const { id_supplier, code, start_date, end_date, status } = request.query;

    if (status !== undefined && status !== null) {
        queries.where.status = status;
    };

    if (id_supplier) {
        queries.where.id_supplier = id_supplier
    };

    if (start_date || end_date) {
        queries.where.purchase_date = {};
        if (start_date) {
            queries.where.purchase_date.gte = start_date
        };
        if (end_date) {
            queries.where.purchase_date.lte = end_date
        };

        queries.orderBy = {};
        queries.orderBy.purchase_date = 'asc';
    };
    
    if (code) {
        queries.where.code = {}
        queries.where.code.contains = code
    };

    try {
        const purchases = await findManyPurchases(queries);
        return reply.code(200).send(purchases);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}