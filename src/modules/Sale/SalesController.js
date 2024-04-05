import {
  checkAvailability,
  createSale,
  findManySales,
  checkSaleAuth,
  findSaleById,
  updateSale
} from './SalesRepository.js'
import {
  resetUserCart
} from '../Cart/CartsRepository.js'

import {
  findUserById
} from '../User/UsersRepository.js'
import { createSnapTransaction } from '../../utils/snap.js';

export async function getSalesController(request, reply) {
  const user = request.user;
  const queries = { include: { User: true }, where: {}, orderBy: { created_at: "desc" } };
  const { id_user, code, payment_method, start_date, end_date, status, daftar } = request.query;

  if (user.id_role == 1) {
    // Admin Special Queries
    if (daftar === "penjualan") {
      if (status !== undefined && status !== null) {
        queries.where.status = status
      } else {
        queries.where.status = { in: [1, 2, 3] }
      }
    } else {
      queries.where.status = 0
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
  const isUserOrAdmin = checkSaleAuth(request.user, request.params.id);
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

export async function cartCheckoutController(request, reply) {
  const body = request.body;
  const user = await findUserById(body.id_user);
  await handlingItemAvailability(request, reply)
  try {
    const sale = await createSale(body);
    await resetUserCart(body.id_user);

    // Midtrans Snap
    const itemDetails = body.sale_detail.map(item => ({
      id: item.id_spare_part.toString(),
      price: item.price,
      quantity: item.quantity,
    }));

    const midtransParams = {
      transaction_details: {
        order_id: sale.id,
        gross_amount: sale.grand_total
      },
      item_details: itemDetails,
      customer_details: {
        first_name: user.name,
        phone: user.phone,
        shipping_address: {
          first_name: user.name,
          phone: user.phone,
          address: user.address
        }
      },
    }
    const snapToken = await createSnapTransaction(midtransParams);
    sale.snapToken = snapToken;

    return reply.code(201).send(sale);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}

export async function createCashSaleController(request, reply) {
  const body = request.body;
  await handlingItemAvailability(request, reply)
  try {
    const sale = await createSale(body);
    return reply.code(200).send(sale);
  } catch (error) {
    return reply.code(500).send(Error(error.message));
  }
}

export async function updateSaleController(request, reply) {
  const body = request.body;
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