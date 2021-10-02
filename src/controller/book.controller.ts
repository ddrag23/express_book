import { Request, Response } from 'express'
import BookService from '../services/book.services'

class BookController {
  public service: BookService
  constructor() {
    this.service = new BookService()
  }

  public index = async (req: Request, res: Response) => {
    res.send(await this.service.all()).json()
  }

  public store = async (req: Request, res: Response) => {
    try {
      const results = await this.service.store(req)
      res.send(results)
    } catch (error) {
      res.send(error)
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const results = await this.service.handleFind(+req.params.id)
      res.send(results)
    } catch (error) {
      res.send(error)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    try {
      res.send(await this.service.handleDelete(+req.params.id))
    } catch (error) {
      console.log(JSON.stringify(error))
      const { meta } = JSON.parse(JSON.stringify(error))
      res.send(meta)
    }
  }
}

export default new BookController()
