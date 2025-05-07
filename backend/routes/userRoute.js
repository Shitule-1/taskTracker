import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware'
const router=express.Router()

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/curloginuser",authMiddleware,userController.curloginuser)
export default router   