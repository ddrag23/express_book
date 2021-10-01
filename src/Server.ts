import express, { Application, urlencoded, json } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import bookRouter from './routes/book'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import categoryRouter from './routes/category'

export default class Server {
  protected app: Application
  protected port: number
  constructor(port: number) {
    this.app = express()
    this.port = port
    this.plugins()
    this.routes()
  }

  protected plugins() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(urlencoded({ extended: true }))
    this.app.use(json())
  }

  protected routes(): void {
    this.app.use('/book', bookRouter)
    this.app.use('/user', userRouter)
    this.app.use('/auth', authRouter)
    this.app.use('/kategori', categoryRouter)
    this.app.use('*', (_, res: express.Response) => {
      res.status(404).send('Page Not Found')
    })
  }

  public runServer() {
    this.app.listen(this.port, () => {
      console.log('Server running on port:' + this.port)
    })
  }
}
