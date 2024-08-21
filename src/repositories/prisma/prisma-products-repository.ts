import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository{
  async findById(productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        productId,
      },
    })

    return product
  }
  
  async findAllProducts() {
    const products = await prisma.product.findMany()

    return products
  }

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