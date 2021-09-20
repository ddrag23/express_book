import { Router } from 'express'
import BookController from '../controller/book.controller'

const router = Router()

router.get('/', BookController.index)

export default router
