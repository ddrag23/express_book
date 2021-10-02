import { Router } from 'express'
import BookController from '../controller/book.controller'
import upload from '../pkg/upload'

const router = Router()

router.get('/', BookController.index)
router.post('/', upload.single('book_image'), BookController.store)
router.get('/:id', BookController.show)
router.delete('/:id', BookController.destroy)

export default router
