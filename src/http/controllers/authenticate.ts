import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUserUseCase } from "../../use-cases/factories/make-authenticate-user-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(8),
  })
  
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    await authenticateUserUseCase.execute({
      email, password
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message})
    }

    throw err
  }

  return reply.status(200).send()
}