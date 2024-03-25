import prisma from "../../utils/prisma.js";

export async function findManySales(queries) {
  try {
    const sales = await prisma.sale.findMany(queries);
    return sales;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function findSaleById(id) {
  try {
    const sale = await prisma.sale.findFirst({
      where: { id: Number(id) }
    });
    return sale
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkAvailability(items) {
  try {
    await Promise.all(items.map(async (obj) => {
      const sparePart = await prisma.sparePart.findUnique({
        where: { id: items.id_spare_part }
      });
      if (sparePart.stock < items.quantity) {
        throw new Error(`Insufficient Stock for item with ID: ${item.id_spare_part}`);
      }
    }));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createSale(inputs) {
  try {
    const sale = await prisma.sale.create({
      data: {
        id_user: inputs.id_user,
        code: inputs.code,
        payment_method: inputs.payment_method,
        grand_total: inputs.grand_total,
        status: inputs.status,
        payment_date: (inputs.payment_date === undefined ? null : inputs.payment_date),
        expired_date: (inputs.expired_date === undefined ? null : inputs.expired_date),
        SaleDetail: {
          createMany: {
            data: inputs.sale_detail
          }
        }
      },
      include: { SaleDetail: true }
    })

    //Update item stocks in spare_part table
    await Promise.all(inputs.sale_detail.map(async (saleDetail) => {
      await prisma.sparePart.update({
        where: { id: saleDetail.id_spare_part },
        data: { stock: { decrement: saleDetail.quantity } }
      })
    }));
    return sale;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSale(id, inputs) {
  try {
    const sale = await prisma.sale.update({
      where: { id: Number(id) }
    });
    return sale
  } catch (error) {
    throw new Error(error.message);
  }
}