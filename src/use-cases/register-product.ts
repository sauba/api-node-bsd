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

export class RegisterProductUseCase { 
  constructor(private productsRepository: ProductsRepository) {}

  async execute({name, description, brand, productType, factoryPrice, price, productStock, isAvailable}: IRegisterProductUseCaseRequest) {
  
  const productWithSameName = await this.productsRepository.findByName(name)

  if (productWithSameName) {
    throw new ProductAlreadyExistsError()
  }

  await this.productsRepository.create({
      name, description, brand, productType, factoryPrice, price, productStock, isAvailable
    })
  }
}
