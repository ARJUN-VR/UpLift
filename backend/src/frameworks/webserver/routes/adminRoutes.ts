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
adminRouter.get('/getCampaign',controller.findCampaignById)
adminRouter.patch('/verify-campaign',controller.verifyCampaign)
adminRouter.get('/get-campaigns',controller.listCampaignRequests)
adminRouter.get('/get-liveCampaigns',controller.listLiveCampaigns)
adminRouter.post('/category',controller.addCategory)
adminRouter.patch('/category-action',controller.categoryAction)
adminRouter.patch('/edit-category',controller.editCategory)
adminRouter.get('/dashboard',controller.getDashboardCounts)
adminRouter.get('/dashboard-payments',controller.getPaymentBarData)
adminRouter.get('/dashboard-pie',controller.getPieChartData)


export default adminRouter

