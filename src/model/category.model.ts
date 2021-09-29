import { Category, PrismaClient } from '.prisma/client'

interface CategoryModelInterface {
  findAll(): Promise<Category[]>
  find(id: number): Promise<Category>
  save(body: Record<string, string>): Promise<Category>
  destroy(id: number): Promise<Category>
}
export default class CategoryModel extends PrismaClient
  implements CategoryModelInterface {
  public async findAll(): Promise<Category[]> {
    try {
      return await this.category.findMany()
    } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error')
    } finally {
      await this.$disconnect
    }
  }

  public async find(id: number): Promise<Category> {
    const category = await this.category.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
    return category
  }
  public async save(body: Record<string, string>): Promise<Category> {
    try {
      const { name_category, id } = body
      const store = await this.category.upsert({
        where: {
          id: +id,
        },
        update: {
          name_category,
        },
        create: {
          name_category,
        },
      })
      return store
    } catch (error) {
      throw new Error(error as string)
    } finally {
      await this.$disconnect
    }
  }
  public async destroy(id: number): Promise<Category> {
    const deleted = await this.category.delete({ where: { id } })
    return deleted
  }
}
