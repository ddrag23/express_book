import { PrismaClient } from '.prisma/client'

class BookRepository extends PrismaClient {
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
}

export default BookRepository
