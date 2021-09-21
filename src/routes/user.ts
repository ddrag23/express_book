import { Router } from 'express'
import UserController from '../controller/user.controller'

const router = Router()

router.get('/', UserController.index)
router.post('/store', UserController.store)

export default router
