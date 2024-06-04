import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface IRegisterUserUseCaseRequest {
  email: string
  name: string
  role: string
  password_hash: string
}

interface IRegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase { 
  constructor(private usersRepository: UsersRepository) {}

  async execute({email,name,role,password_hash}: IRegisterUserUseCaseRequest): Promise<IRegisterUserUseCaseResponse> {
  const passwordHash = await hash(password_hash, 6)

  const userWithSameEmail = await this.usersRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw new UserAlreadyExistsError()
  }

  const user = await this.usersRepository.create({
      email, name, role, password_hash:passwordHash
    })
  
    return {
      user
    }
  }
}
