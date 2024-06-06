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

export async function findOneSale(queries) {
  try {
    const sale = await prisma.sale.findFirst(queries);
    if (sale.SaleDetail) {
      await Promise.all(sale.SaleDetail.map(async (sDetail) => {
        const file = await prisma.file.findFirst({
          where: {
            file_model: "spare_parts",
            file_id: sDetail.id_spare_part
          }
        });
        sDetail.SparePart.file_name = file ? file.name : null
      }));
    }
    return sale
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkSaleAuth(user, id) {
  try {
    const sale = await prisma.sale.findUnique({ where: { id } });
    if (sale.id_user !== user.id && user.id_role !== 1) {

      throw new Error("You don't have access to this data!");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkAvailability(items) {
  try {
    await Promise.all(items.map(async (obj) => {
      const sparePart = await prisma.sparePart.findUnique({
        where: { id: obj.id_spare_part }
      });
      if (sparePart.stock < obj.quantity) {
        throw new Error(`Insufficient Stock for item with ID: ${obj.id_spare_part}`);
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
    const result = await prisma.$transaction(async (prisma) => {
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
      });

      //Update item stocks in spare_part table
      await Promise.all(inputs.sale_detail.map(async (saleDetail) => {
        await prisma.sparePart.update({
          where: { id: saleDetail.id_spare_part },
          data: { stock: { decrement: saleDetail.quantity } }
        })
      }));
      return sale;
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSale(id, inputs) {
  try {
    const sale = await prisma.sale.update({
      where: { id: Number(id) },
      data: inputs
    });
    return sale
  } catch (error) {
    throw new Error(error.message);
  }
}