import { Router } from 'express'
interface IRoute {
  router(): void
}

export default abstract class BaseRoute implements IRoute {
  public route: Router
  constructor() {
    this.route = Router()
    this.router()
  }
  abstract router(): void
}
