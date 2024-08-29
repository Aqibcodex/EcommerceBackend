import express from "express"
import { addcart,webhook,Addcartes } from "../controller/stripecontroller.js"
const router=express.Router()
  router.post("/addcash",addcart)
  router.post("/webhook",webhook)
  router.post("/addcash/confirm",Addcartes)
  export default router