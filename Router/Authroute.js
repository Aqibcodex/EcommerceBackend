import express from "express"
import auth from "../Authorization Middleware/authMiddleware.js"
import authorized from "../Authorization Middleware/AuthorizationMiddleware.js"
import {CreateUser,login,getUser,getallUser,updateuser,deleteuser,forgotpassword,Resetpassword} from "../controller/authonntroller.js"
const router=express.Router()
router.post("/signup",CreateUser)
router.post("/login",login)
router.get("/getuser/:id",auth,authorized,getUser)
router.get("/getall",auth,authorized,getallUser)
router.patch("/updateuser/:id",auth,updateuser)
router.delete("/deleteuser/:id",auth,authorized,deleteuser)
router.post("/forgotpassword",auth,forgotpassword)
router.post("/resetpassword/:id",auth,Resetpassword)
export default router