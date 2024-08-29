import express from "express"
import bodyParser from "body-parser"
import {config} from "dotenv"
import morgan from "morgan"
import connection from "./config/dbconnection.js"
import globalerror from "./ErrorMiddleware/globalerror.js"
import customerror from "./ErrorMiddleware/customerror.js"
import authrouter from "./Router/Authroute.js"
import categoryrouter from "./Router/categoryroute.js"
import subcategory from "./Router/subcatrouter.js"
import productrouter from "./Router/productrouter.js"
import cartrouter from "./Router/cartrouter.js"
import striperouter from "./Router/striperouter.js"
import orderrouter from "./Router/orderrouter.js"
const app=express()
//app.use(morgan("tiny"))
config()
connection()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/user",authrouter)
app.use("/api/user",categoryrouter)
app.use("/api/user",subcategory)
app.use("/api/user",productrouter)
app.use("/api/user",cartrouter)
app.use("/api/user",striperouter)
app.use("/api/user",orderrouter)

app.all("*",(req,res,next)=>{
   next( new customerror("page not found",404))
})
app.use(globalerror)
const port=process.env.PORT||4000
app.listen(port,()=>{
    console.log(`server was listning on these ${port}`)
})
