import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from './../../use-cases/errors/user-already-exists-error';

import { z } from "zod";
import { makeRegisterUserUseCase } from '../../use-cases/factories/make-register-user-use-case';

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
    password_hash: z.string().min(8),
  })
  
  const { name, email, role, password_hash } = registerUserSchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUserUseCase()
    
    await registerUserUseCase.execute({
      email, name, role, password_hash
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message})
    }

    throw err
  }

  return reply.status(201).send()
}