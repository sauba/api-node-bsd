import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository{
  async findByName(name: string) {
    const product = await prisma.product.findUnique({
      where: {
        name,
      }
    })
    return product
  }
  
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }
}