import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it('Should Be Able to Authenticate', async() => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: `123456`,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should Not Be Able to Authenticate With Wrong E-mail', async() => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() => sut.execute({
      email: 'jhondoe@example.com',
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should Not Be Able to Authenticate With Wrong Password', async() => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() => sut.execute({
      email: 'jhondoe@example.com',
      password: "123457",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})