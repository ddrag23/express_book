import BookRepository from '../repository/book.repository'

class BookService {
  protected repository: BookRepository
  constructor() {
    this.repository = new BookRepository()
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
