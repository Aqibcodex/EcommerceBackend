import express from "express"
// import { addchecke,wehbook } from "../controller/stripecontroller.js"
import {createcart,addstock,Getacart,Getallcart,updatecart,deletecart}from "../controller/cartcontroller.js"
const router=express.Router()
   router.post("/createcart",createcart)
   router.post("/addstock",addstock)
   router.get("/getcart/:id",Getacart)
   router.get("/getallcart",Getallcart)
 router.patch("/updatecart",updatecart)
 router.delete("/deletecart",deletecart)
   export default router