import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotnv from 'dotenv'

dotnv.config()

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
  }

  protected routes() {}

  public runServer() {
    this.app.listen(this.port, () => {
      console.log('Server running on port:' + this.port)
    })
  }
}
