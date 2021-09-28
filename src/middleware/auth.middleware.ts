import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../pkg/jwt'

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'unathorized',
    })
  }
  try {
    const verifyToken = await verifyAccessToken(token)
    // @ts-ignore
    req.user = verifyToken
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error,
    })
  }
}
