import BaseRoute from './BaseRoute'
import BookController from '../controller/BookController'
import { Router } from 'express'

class BookRoute extends BaseRoute {
  public async router() {
    Router().get('/', BookController.index)
  }
}

export default new BookRoute()
