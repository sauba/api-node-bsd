import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>
  findByName(name: string): Promise< Product | null>
  findAllProducts(): Promise<Product[] | null>
  create(data: Prisma.ProductCreateInput): Promise<Product>
}