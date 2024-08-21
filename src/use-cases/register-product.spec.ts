import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products-repository";
import { RegisterProductUseCase } from "./register-product";

let productsRepository: InMemoryProductsRepository
let sut: RegisterProductUseCase

describe("Register Product Use Case", () => {
  beforeEach((() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new RegisterProductUseCase(productsRepository)
  }))

  it('Should Be Able to Register a Product', async() => {
    const { product } = await sut.execute({
      productId: randomUUID,
      name: 'product test',
      description: 'product description test',
      brand: 'brand test',
      productType: 'product type test',
      factoryPrice: 500,
      price: 1000,
      productStock: 999,
      isAvailable: true,
      photoUrls: {},
    })

    expect(product.name).toEqual(expect.any(String))
  })

  it('Should Not Be Able to Register a Product With Same Name', async() => {
    await sut.execute({
      productId: randomUUID,
      name: 'product test',
      description: 'product description test',
      brand: 'brand test',
      productType: 'product type test',
      factoryPrice: 500,
      price: 1000,
      productStock: 999,
      isAvailable: true,
      photoUrls: {},
    })

    await expect(() => sut.execute({
      productId: randomUUID,
      name: 'product test',
      description: 'product description test',
      brand: 'brand test',
      productType: 'product type test',
      factoryPrice: 500,
      price: 1000,
      productStock: 999,
      isAvailable: true,
      photoUrls: {},
    })).rejects.toBeInstanceOf(Error)
  })
})