import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should Be Able to Authenticate', async() => {
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
    expect(() => sut.execute({
      email: 'jhondoe@example.com',
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should Not Be Able to Authenticate With Wrong Password', async() => {
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