import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  findByName(name: string): Promise< Product | null>
  create(data: Prisma.ProductCreateInput): Promise<Product>
}