import express from 'express'
import { userController } from '../../../controllers/userController'

const router=express.Router()
const controller=userController()
    
router.get('/',controller.loadPage)

 export default router
