import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products-repository";

interface IFetchProductsUseCaseRequest {
  // name: string
  // description: string
  // brand: string
  // productType: string
  // factoryPrice: number
  // price: number
  // productStock: number
  // isAvailable: boolean
  // photoUrls?: Prisma.JsonObject,
  // Orders?: Prisma.JsonObject,
}

interface IFetchProductsUseCaseResponse {
  product: Product[]
}

export class FetchProductsUseCase { 
  constructor(private productsRepository: ProductsRepository) {}
  
  async execute({}: IFetchProductsUseCaseRequest): Promise<IFetchProductsUseCaseResponse> {

  const allProducts = await this.productsRepository.findAllProducts()

  return {
      allProducts,
    }
  }
}
