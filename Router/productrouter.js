import express from "express"
import {createproduct,getallproduct,getproduct,updateproduct,deleteproduct} from "../controller/productcontroller.js"
import upload from '../utils/multer.js';
const router=express.Router()
router.post("/createproduct",upload.single("image"),createproduct)
router.get("/getproduct/:name",getproduct)
router.get("/getallproduct",getallproduct)
router.patch("/updateproduct/:name",updateproduct)
router.delete("/deleteproduct/:name",deleteproduct)
export default router