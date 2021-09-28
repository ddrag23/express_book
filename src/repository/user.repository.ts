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
    } finally {
      await this.$disconnect
    }
  }

  public async find(id: number): Promise<Users> {
    const user = await this.users.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
    return user
  }

  public async findUsername(username: string): Promise<Users> {
    const user = await this.users.findUnique({
      where: {
        username,
      },
      rejectOnNotFound: true,
    })
    return user
  }

  public async destroy(id: number): Promise<Users | Prisma.RejectOnNotFound> {
    const deleted = await this.users.delete({ where: { id } })
    return deleted
  }
}

export default UserRepository
