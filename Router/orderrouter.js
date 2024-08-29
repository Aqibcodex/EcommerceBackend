import express from "express"
import auth from "../Authorization Middleware/authMiddleware.js"
import {createorder,getallorder,trackOrder,updateOrder,refund } from "../controller/ordercontroller.js"
const router=express.Router()
router.post("/createorder",createorder)
router.get("/getallorder",getallorder)
router.get("/trackorder/:id",trackOrder)
router.patch("/updateorder/:id",auth,updateOrder)
router.post("/refund",refund)
export default router