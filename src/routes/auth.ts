import { Router } from 'express'
import AuthController from '../controller/auth.controller'

const router = Router()

router.post('/login', AuthController.login)
router.get('/refresh-token', AuthController.refreshToken)
export default router
