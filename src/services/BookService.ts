import dbConnect from '../config/typeorm'
import { Connection, getConnection } from 'typeorm'
import BookRepository from '../repository/BookRepository'

class BaseService {
  public async connection(): Promise<Connection> {
    return await dbConnect()
  }
}

class BookService extends BaseService {
  protected repository: BookRepository
  constructor() {
    super()
    this.repository = getConnection().getCustomRepository(BookRepository)
  }
  public async index() {
    const books = this.repository.find()
    return books
  }
}

export default BookService
