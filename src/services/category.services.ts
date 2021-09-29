import { Prisma, Category } from '.prisma/client'
import CategoryModel from '../model/category.model'

export default class CategoryService {
  protected model: CategoryModel
  constructor() {
    this.model = new CategoryModel()
  }

  public async all(): Promise<Array<Category>> {
    try {
      const Category = await this.model.findAll()
      return Category
    } catch (err) {
      throw new Error(err as string)
    }
  }

  public async store(
    data: Record<string, string>,
  ): Promise<Object | undefined> {
    try {
      const storeTomodel = await this.model.save(data)
      const response = {
        message: 'Data berhasil dimasukkan',
        data: storeTomodel,
      }
      return response
    } catch (error) {
      throw new Error(error as string)
    }
  }

  public async handleFind(id: number): Promise<Category> {
    const user = await this.model.find(id)
    return user
  }

  public async handleDelete(
    id: number,
  ): Promise<Category | Prisma.RejectOnNotFound> {
    const deleteCategory = await this.model.destroy(id)
    return deleteCategory
  }
}
