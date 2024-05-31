import {
    findManyPurchases,
    createPurchase,
    findOnePurchase,
    updatePurchase
} from './PurchasesRepository.js'

export async function getPurchasesController(request, reply) {
    const queries = { 
        include: { Supplier: true }, 
        where: {},
        orderBy: {created_at: "desc"} 
    };
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

        queries.orderBy = { purchase_date: "asc" };
    };

    if (code) {
        queries.where.code = { contains: code }
    };

    try {
        const purchases = await findManyPurchases(queries);
        return reply.code(200).send(purchases);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function getOnePurchaseController(request, reply) {
    const queries = {
        where: { id: Number(request.params.id) },
        include: {
            PurchaseDetail: {
                include: {
                    SparePart: {
                        include: {
                            SparePartBrand: true,
                            Car: {
                                include: { CarBrand: true }
                            }
                        }
                    }
                }
            }
        }
    }
    try {
        const purchase = await findOnePurchase(queries);
        return reply.code(200).send(purchase);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createPurchaseController(request, reply) {
    const body = request.body;
    try {
        const purchase = await createPurchase(body);
        return reply.code(201).send(purchase);
    } catch (error) {
        return reply.code(500).send(Error(error.message))
    }
}

export async function updatePurchaseController(request, reply) {
    const body = request.body;
    if (!await findOnePurchase({ where: { id: Number(request.params.id) } })) {
        return reply.code(404).send(Error("Purchase is not found!"));
    }
    try {
        const purchase = await updatePurchase(request.params.id, body)
        return reply.code(200).send(purchase);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}