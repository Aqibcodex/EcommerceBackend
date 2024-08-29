import express from "express"
import { createcategory,getcategory,getallcategory,updatecategory,deletecategory } from "../controller/categorycontroller.js"
  const router=express.Router()
     router.post("/create",createcategory)
     router.get("/get/:name",getcategory)
     router.get("/getallcategory",getallcategory)
     router.patch("/updatecategory/:name",updatecategory)
     router.delete("/deletecategory/:name",deletecategory)
     export default router