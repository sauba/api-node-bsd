import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products-repository";
import { ProductAlreadyExistsError } from './errors/product-already-exists-error';

interface IRegisterProductUseCaseRequest {
  name: string
  description: string
  brand: string
  productType: string
  factoryPrice: number
  price: number
  productStock: number
  isAvailable: boolean
}

interface IRegisterProductUseCaseResponse {
  product: Product
}

export class RegisterProductUseCase { 
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    brand,
    productType,
    factoryPrice,
    price,
    productStock,
    isAvailable
  }: IRegisterProductUseCaseRequest): Promise<IRegisterProductUseCaseResponse> {
  
  const productWithSameName = await this.productsRepository.findByName(name)

  if (productWithSameName) {
    throw new ProductAlreadyExistsError()
  }

  const product = await this.productsRepository.create({
      name, description, brand, productType, factoryPrice, price, productStock, isAvailable
    })

    return {
      product,
    }
  }
}
