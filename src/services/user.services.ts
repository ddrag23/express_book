import { Prisma, Users } from '.prisma/client'
import { hash } from '../pkg/hash'
import UserRepository from '../repository/user.repository'

class UserService {
  protected repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  public async all(): Promise<Array<Users>> {
    try {
      const users = await this.repository.findAll()
      return users
    } catch (err) {
      throw new Error(err as string)
    }
  }

  public async store(
    data: Prisma.UsersCreateInput,
  ): Promise<Object | undefined> {
    try {
      const { password } = data
      const hashPassword = await hash(password)
      const storeToRepository = await this.repository.save({
        ...data,
        password: hashPassword,
      })
      const response = {
        message: 'Data berhasil dimasukkan',
        data: storeToRepository,
      }
      return response
    } catch (error) {
      throw new Error(error as string)
    }
  }

  public async handleFind(id: number): Promise<Users> {
    const user = await this.repository.find(id)
    return user
  }

  public async handleDelete(
    id: number,
  ): Promise<Users | Prisma.RejectOnNotFound> {
    const deleteUser = await this.repository.destroy(id)
    return deleteUser
  }
}

export default UserService
