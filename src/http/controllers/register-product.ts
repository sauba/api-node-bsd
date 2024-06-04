import { ProductAlreadyExistsError } from './../../use-cases/errors/product-already-exists-error';
import { FastifyReply, FastifyRequest } from "fastify";

import z from "zod";
import { prisma } from "../../lib/prisma";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products-repository";
import { RegisterProductUseCase } from "../../use-cases/register-product";

export async function registerProduct(request: FastifyRequest, reply: FastifyReply) {
  const registerProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    brand: z.string(),
    productType: z.string(),
    factoryPrice: z.number(),
    price: z.number(),
    productStock: z.number(),
    isAvailable: z.boolean(),
  })

  const { name, description, brand, productType, factoryPrice, price, productStock, isAvailable} = registerProductSchema.parse(request.body)

  try {
    const productsRepository = new PrismaProductsRepository()
    const registerProductUseCase = new RegisterProductUseCase(productsRepository)

    await registerProductUseCase.execute({
      name, description, brand, productType, factoryPrice, price, productStock, isAvailable
    })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message})
    }

    throw err
  }

  return reply.status(201).send()
}
