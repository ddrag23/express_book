import { Router } from 'express'
import UserController from '../controller/user.controller'
import { authentication } from '../middleware/auth.middleware'

const router = Router()

router.get('/', authentication, UserController.index)
router.post('/store', UserController.store)
router.get('/show/:id', UserController.show)
router.delete('/delete/:id', UserController.destroy)

export default router
