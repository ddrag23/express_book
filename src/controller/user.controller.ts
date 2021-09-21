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
}

export default new UserController()
