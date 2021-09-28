import { verify, sign } from 'jsonwebtoken'
import 'dotenv/config'

export const verifyAccessToken = async (token: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.ACCESS_TOKEN!, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const verifyRefreshToken = async (token: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.REFRESH_TOKEN!, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const createAccessToken = (payload: { id: string }): string => {
  return sign(payload, process.env.ACCESS_TOKEN!, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (payload: { id: string }): string => {
  return sign(payload, process.env.REFRESH_TOKEN!, {
    expiresIn: '7d',
  })
}
