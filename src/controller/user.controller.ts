import { Request, Response } from 'express'
import UserService from '../services/user.services'
class UserController {
  public service: UserService
  constructor() {
    this.service = new UserService()
  }

  public index = async (req: Request, res: Response) => {
    console.log(await this.service.all())
    res.send(await this.service.all()).json()
  }

  public store = async (req: Request, res: Response): Promise<void> => {
    try {
      const store = await this.service.store(req.body)
      res.send(store)
    } catch (error) {
      console.log(error)
      res.send({
        message: 'Data gagal dimasukkan',
        data: error,
      })
    }
  }

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const userSingleData = await this.service.handleFind(+req.params.id)
      res.send(userSingleData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
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

export default new UserController()
