import { Book, PrismaClient } from '.prisma/client'

interface BookModelInterface {
  findAll(): Promise<Book[]>
  find(id: number): Promise<Book>
  save(body: Record<string, string>): Promise<Book>
  destroy(id: number): Promise<Book>
}
class BookModel extends PrismaClient implements BookModelInterface {
  public async findAll(): Promise<Book[]> {
    try {
      return await this.book.findMany({
        include: {
          categories: {
            select: {
              name_category: true,
            },
          },
          author: {
            select: {
              username: true,
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw new Error('Internal Server Error')
    } finally {
      await this.$disconnect
    }
  }
  public async find(id: number): Promise<Book> {
    const book = await this.book.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
    return book
  }
  public async save(body: Record<string, string>): Promise<Book> {
    try {
      const {
        category_id,
        id,
        author_id,
        book_image,
        slug,
        book_title,
        book_desc,
      } = body
      const store = await this.book.upsert({
        where: {
          id: +id,
        },
        update: {
          category_id: +category_id,
          author_id: +author_id,
          book_image,
          book_title,
          slug,
          book_desc,
        },
        create: {
          category_id: +category_id,
          author_id: +author_id,
          book_image,
          book_title,
          slug,
          book_desc,
        },
      })
      return store
    } catch (error) {
      throw new Error(error as string)
    } finally {
      await this.$disconnect
    }
  }
  public async destroy(id: number): Promise<Book> {
    const deleted = await this.book.delete({ where: { id } })
    return deleted
  }
}

export default BookModel
