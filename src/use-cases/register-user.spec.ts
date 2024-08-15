import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../use-cases/errors/user-already-exists-error";
import { RegisterUserUseCase } from "./register-user";

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe("Register User Use Case", () => {
  beforeEach((() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  }))

  it('Should Be Able to Register', async() => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password_hash: "App@2024@",
      role: "client"
    })

    const isPasswordCorrectlyHashed = await compare(
      'App@2024@',
      user.password_hash
    )

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should Hash User Password Upon Registration', async() => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password_hash: "App@2024@",
      role: "client"
    })

    const isPasswordCorrectlyHashed = await compare(
      'App@2024@',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should Not Be Able to Register an User With Same E-mail Twice', async() => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: "Jhon Doe",
      email: email,
      password_hash: "App@2024@",
      role: "client"
    })

    await expect(() => 
      sut.execute({
        name: "Jhon Doe",
        email: email,
        password_hash: "App@2024@",
        role: "client"
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})