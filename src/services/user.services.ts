import { Prisma, Users } from '.prisma/client'
import { hash } from '../pkg/hash'
import UserModel from '../model/user.model'

class UserService {
  protected model: UserModel
  constructor() {
    this.model = new UserModel()
  }
  public async all(limit: number, offset: number): Promise<Array<Users>> {
    try {
      const users = await this.model.findAll(limit, offset)
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
      const storeTomodel = await this.model.save({
        ...data,
        password: hashPassword,
      })
      const response = {
        message: 'Data berhasil dimasukkan',
        data: storeTomodel,
      }
      return response
    } catch (error) {
      throw new Error(error as string)
    }
  }

  public async handleFind(id: number): Promise<Users> {
    const user = await this.model.find(id)
    return user
  }

  public async handleDelete(
    id: number,
  ): Promise<Users | Prisma.RejectOnNotFound> {
    const deleteUser = await this.model.destroy(id)
    return deleteUser
  }
}

export default UserService
