import { Prisma, PrismaClient } from '.prisma/client'

class UserRepository extends PrismaClient {
  public async findAll() {
    try {
      return await this.users.findMany()
    } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error')
    } finally {
      await this.$disconnect
    }
  }

  public async save(user: Prisma.UsersCreateInput): Promise<any> {
    try {
      const store = await this.users.create({ data: user })
      return store
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export default UserRepository
