import { Book, Prisma } from '.prisma/client'
import BookModel from '../model/book.model'
import { Request } from 'express'
import * as fs from 'fs'
import path from 'path'

class BookService {
  protected model: BookModel
  constructor() {
    this.model = new BookModel()
  }
  public async all(): Promise<Book[]> {
    try {
      const books = await this.model.findAll()
      return books
    } catch (err) {
      throw new Error(err as string)
    }
  }

  public async store(req: Request) {
    try {
      const storeTomodel = await this.model.save({
        ...req.body,
        book_image: req.file?.filename,
        slug: req.body.book_title.replace(' ', '-'),
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

  public async handleFind(id: number): Promise<Book> {
    const book = await this.model.find(id)
    return book
  }

  public async handleDelete(
    id: number,
  ): Promise<Book | Prisma.RejectOnNotFound> {
    const findImage = await this.handleFind(id)
    fs.unlinkSync(path.join(__dirname, '../../uploads/' + findImage.book_image))
    const deleteBook = await this.model.destroy(id)
    return deleteBook
  }
}

export default BookService
