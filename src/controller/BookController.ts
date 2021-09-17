import { Request, Response } from 'express'
import { Book } from '../entities/Book'
import { getConnection } from 'typeorm'

class BookController {
  //   protected repository = getRepository(Book)
  // constructor(parameters) {

  // }

  async index(req: Request, res: Response) {
    return res.send({ data: await getConnection().getRepository(Book).find() })
  }
}

export default new BookController()
