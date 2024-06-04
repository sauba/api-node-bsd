import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from './../../use-cases/errors/user-already-exists-error';

import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from '../../use-cases/register-user';

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
    password_hash: z.string().min(8),
  })
  
  const { name, email, role, password_hash } = registerUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)
    
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