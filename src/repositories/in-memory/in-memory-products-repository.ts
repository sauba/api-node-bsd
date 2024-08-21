import { Prisma, Product } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { ProductsRepository } from './../products-repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findById(id: string) {
    const product = this.items.find(item => item.productId === id)

    if (!product) {
      return null
    }

    return product
  }
  
  async findByName(name: string) {
    const product = this.items.find(item => item.name === name)

    if (!product) {
      return null
    }

    return product
  }

  async findManyProducts() {
    return this.items.filter((item) => item.isAvailable === true)
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      productId: data.productId ?? randomUUID(),
      name: data.name,
      description: data.description,
      brand: data.brand,
      productType: data.productType,
      factoryPrice: data.factoryPrice,
      price: data.price,
      productStock: data.productStock,
      isAvailable: data.isAvailable,
      photoUrls: data.photoUrls,
      Orders: data.Orders,
    }

    this.items.push(product)

    return product
  }
}