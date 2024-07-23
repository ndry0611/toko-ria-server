import {
  checkAvailability,
  createSale,
  findManySales,
  findOneSale,
  checkSaleAuth,
  findSaleById,
  updateSale
} from './SalesRepository.js'

export async function getSalesController(request, reply) {
  const user = request.user;
  const queries = { include: { User: true }, where: {}, orderBy: { created_at: "desc" } };
  const { id_user, code, payment_method, start_date, end_date, status, daftar } = request.query;

  if (user.id_role == 1 || user.id_role == 3) {
    // Admin Special Queries
    if (daftar === "penjualan") {
      if (status) {
        queries.where.status = status
      } else {
        queries.where.status = { in: [3, 4] }
      }
    } else if (daftar === "pesanan") {
      if (status) {
        queries.where.status = status
      } else {
        queries.where.status = { in: [1, 2] }
      }
    }

    if (id_user) {
      queries.where.id_user = id_user
    }

    if (payment_method !== undefined && payment_method !== null) {
      queries.where.payment_method = payment_method
    }
  } else {
    // User Queries
    queries.where.id_user = user.id
    if (status !== undefined && status !== null) {
      queries.where.status = status
    }
  }

  if (code) {
    queries.where.code = { contains: code }
  }

  if (start_date || end_date) {
    queries.where.created_at = {};
    if (start_date) {
      queries.where.created_at.gte = start_date
    };
    if (end_date) {
      queries.where.created_at.lte = end_date
    }
    queries.orderBy.created_at = "asc"
  }
  try {
    const sales = await findManySales(queries);
    return reply.code(200).send(sales);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}

export async function getOneSaleController(request, reply) {
  const isUserOrAdmin = await checkSaleAuth(request.user, request.params.id);
  if (!isUserOrAdmin) {
    return reply.code(403).send(Error("You don't have access to this data!"));
  }

  const queries = {
    where: { id: Number(request.params.id) },
    include: {
      User: true,
      SaleDetail: {
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
    const sale = await findOneSale(queries);
    return reply.code(200).send(sale);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}

async function handlingItemAvailability(request, reply) {
  const body = request.body;
  const itemsAvailable = await checkAvailability(body.sale_detail);
  if (!itemsAvailable) {
    return reply.code(400).send(Error('Some items are not available'));
  }
}

export async function createCashSaleController(request, reply) {
  const body = request.body;
  if (body.sale_detail.length === 0) {
    return reply.code(400).send(Error("Daftar Belanja Tidak Boleh Kosong!"));
  }
  await handlingItemAvailability(request, reply)
  try {
    const sale = await createSale(body);
    return reply.code(201).send(sale);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}

export async function updateSaleController(request, reply) {
  const body = request.body;
  const isUserOrAdmin = await checkSaleAuth(request.user, request.params.id)
  if (!isUserOrAdmin) {
    return reply.code(403).send(Error("You don't have access to this data!"))
  }
  if (!await findSaleById(request.params.id)) {
    return reply.code(404).send(Error('Sale is not found!'));
  }
  try {
    const sale = await updateSale(request.params.id, body);
    return reply.code(200).send(sale);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}