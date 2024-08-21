import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products-repository";
import { RegisterProductUseCase } from "./register-product";

let productsRepository: InMemoryProductsRepository
let sut: RegisterProductUseCase

describe("Get Products Use Case", () => {
  beforeEach((() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new RegisterProductUseCase(productsRepository)
  }))

  it('Should Be Able to Fetch Products', async() => {
    await sut.execute({
      name: 'product-1',
      description: 'product description test',
      brand: 'brand test',
      productType: 'product type test',
      factoryPrice: 500,
      price: 1000,
      productStock: 999,
      isAvailable: true,
    })

    await productsRepository.create({
      name: "Product-2",
      description: "product-2 description",
      productStock: 200,
      brand: "test",
      price: 53.75,
      productType: "sedas",
      factoryPrice: 33,
      isAvailable: true,
    })

    await productsRepository.create({
      name: "Product-3",
      description: "product-3 description",
      productStock: 50,
      brand: "test",
      price: 468.50,
      productType: "sedas",
      factoryPrice: 299.90,
      isAvailable: true,
    })

    const products = await productsRepository.findManyProducts()

    expect(products.length).toEqual(3)
  })
})