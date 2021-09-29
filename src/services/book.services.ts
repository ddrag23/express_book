import BookModel from '../model/book.model'

class BookService {
  protected repository: BookModel
  constructor() {
    this.repository = new BookModel()
  }
  public async all() {
    try {
      const books = await this.repository.findAll()
      return books
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

export default BookService
