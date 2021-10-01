import { Router } from 'express'
import CategoryControler from '../controller/category.controller'

const router = Router()

router.get('/', CategoryControler.index)
router.post('/', CategoryControler.store)
router.get('/:id', CategoryControler.show)
router.delete('/:id', CategoryControler.destroy)

export default router
