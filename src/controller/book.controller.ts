import { Request, Response } from 'express'
import BookService from '../services/book.services'
class BookController {
  public service: BookService
  constructor() {
    this.service = new BookService()
  }

  public index = async (req: Request, res: Response) => {
    // const service = new BookService()
    console.log(await this.service.index())
    res.send(await this.service.index()).json()
  }
}

export default new BookController()
