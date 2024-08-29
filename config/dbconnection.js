import mongoose from "mongoose"
async function connection(){
    try{
   await  mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce")
   console.log("db has been connected successfully")
    }
    catch(err){
        console.log(err.message)
    }
}
export default connection