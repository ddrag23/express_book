import { Prisma, PrismaClient, Users } from '.prisma/client'

class UserRepository extends PrismaClient {
  public async findAll(): Promise<Users[]> {
    try {
      return await this.users.findMany()
    } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error')
    } finally {
      await this.$disconnect
    }
  }

  public async save(user: Prisma.UsersCreateInput): Promise<Users> {
    try {
      const store = await this.users.create({ data: user })
      return store
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export default UserRepository
