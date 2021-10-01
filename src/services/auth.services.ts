import { createAccessToken, createRefreshToken } from '../pkg/jwt'
import { compare } from '../pkg/hash'
import UserRepository from '../model/user.model'

export default class AuthService {
  protected repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  public async handleLogin(username: string, password: string) {
    const user = await this.repository.findUsername(username)
    if (!user) {
      throw new Error('Username yang anda masukkan salah')
    }
    const comparePassword = await compare(password, user.password)
    if (!comparePassword) {
      throw new Error('Password yang anda masukkan salah')
    }
    const refreshToken = createRefreshToken({ id: String(user.id) })
    const accessToken = createAccessToken({ id: String(user.id) })
    return {
      data: {
        accessToken,
        refreshToken,
      },
    }
  }
}
