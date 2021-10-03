import { Request, Response } from 'express'
import Joi from 'joi'
import {
  verifyRefreshToken,
  createRefreshToken,
  createAccessToken,
} from '../pkg/jwt'
import AuthService from '../services/auth.services'
import UserService from '../services/user.services'

class AuthController {
  protected service: AuthService
  constructor() {
    this.service = new AuthService()
  }

  public login = async (req: Request, res: Response) => {
    const validator = Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().min(3).required(),
    })
    try {
      await validator.validateAsync(req.body)
      const { username, password } = req.body
      const login = await this.service.handleLogin(username, password)
      if (!login.status) {
        res.send(login)
        return
      }
      res.cookie('_tkn', login.data?.refreshToken, {
        httpOnly: true,
      })
      res.send({
        message: 'Berhasil login',
        token: login.data?.accessToken,
      })
    } catch (error) {
      res.status(res.statusCode).json(error)
    }
  }

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const token: string = req.cookies._tkn

      let payload: any = null
      try {
        payload = await verifyRefreshToken(token)
      } catch (error) {
        console.log(error)
      }
      const userService = new UserService()
      const user = await userService.handleFind(payload.id)
      if (!user) {
        throw new Error('User not found')
      }
      const refreshToken = createRefreshToken({ id: String(user.id) })
      const accessToken = createAccessToken({ id: String(user.id) })
      res
        .cookie('_tkn', refreshToken, {
          httpOnly: true,
          signed: true,
        })
        .send({
          status: 200,
          msg: `Successfully generated a new token for user with ID of ${user.id}`,
          data: { token: accessToken },
        })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  }
}
export default new AuthController()
