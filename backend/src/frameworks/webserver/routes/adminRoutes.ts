import express from 'express'
import { adminController } from '../../../controllers/adminController'
import { adminDbInterface } from '../../../application/repository/adminDbrepository'
import { adminDbMethods } from '../../database/mongoDb/implementations/adminDbMethods'


const adminRouter = express.Router()

const controller = adminController(adminDbInterface,adminDbMethods)

adminRouter.post('/login',controller.adminSignin)
adminRouter.post('/logout',controller.logout)
adminRouter.get('/getusers',controller.getUsers)
adminRouter.patch('/blockuser',controller.blockUser)

export default adminRouter

