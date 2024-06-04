import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../use-cases/errors/user-already-exists-error";
import { RegisterUserUseCase } from "./register-user";

describe("Register User Use Case", () => {
  it('Should Be Able to Register', async() => {
    const registerUserUseCase = new RegisterUserUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          role: data.role,
          password_hash: data.password_hash,
          createdAt: new Date(),
        }
      },
    })

    const { user } = await registerUserUseCase.execute({
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
    const registerUserUseCase = new RegisterUserUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          role: data.role,
          password_hash: data.password_hash,
          createdAt: new Date(),
        }
      },
    })

    const { user } = await registerUserUseCase.execute({
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
    const UsersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(UsersRepository)

    const email = 'johndoe@example.com'

    await registerUserUseCase.execute({
      name: "Jhon Doe",
      email: email,
      password_hash: "App@2024@",
      role: "client"
    })

    await expect(() => 
      registerUserUseCase.execute({
        name: "Jhon Doe",
        email: email,
        password_hash: "App@2024@",
        role: "client"
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})