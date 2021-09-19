import { Request, Response } from 'express'
import BookService from '../services/BookService'
class BookController {
  protected service: BookService
  constructor() {
    this.service = new BookService()
  }

  public async index(req: Request, res: Response) {
    const data = await this.service.index()
    console.log(data)
    res.send(data).json()
  }
}

export default new BookController()
