import { Prisma } from '.prisma/client'
import { hashSync } from 'bcrypt'
// import { hash } from '../pkg/hash'
import UserRepository from '../repository/user.repository'

class UserService {
  protected repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  public async all() {
    try {
      const books = await this.repository.findAll()
      return books
    } catch (err) {
      throw new Error(err as string)
    }
  }

  public async store(
    data: Prisma.UsersCreateInput,
  ): Promise<Object | undefined> {
    try {
      const { password } = data
      const hashPassword = hashSync(password, 10)
      data.password = hashPassword
      const storeToRepository = await this.repository.save(data)
      const response = {
        message: 'Data berhasil dimasukkan',
        data: storeToRepository,
      }
      return response
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export default UserService
