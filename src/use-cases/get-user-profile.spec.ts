import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should Be Able to Get User Profile', async() => {
    const createdUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual('Jhon Doe')
  })

  it('Should Not Be Able to Get User Profile With Wrong Id', async() => {
    expect(() => sut.execute({
      userId: "non-existing-id",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})