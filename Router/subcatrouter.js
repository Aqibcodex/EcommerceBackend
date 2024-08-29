import express from "express"
import {create,getall,getdata,update,deletesubcategory} from "../controller/subcatcontroller.js"
const router=express.Router()
router.post("/subcreate",create)
router.get("/getsubcategory/:name",getdata)
router.get("/getallsubcategory",getall)
router.patch("/updatesubcategory/:name",update)
router.delete("/deletesubcategory/:name",deletesubcategory)
export default router