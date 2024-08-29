import mongoose from "mongoose"
const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the category name is necessary"],
        unique:true
    },
    description:{
        type:String,
        required:[true,"the desciption is necessary"]
    }
})
const category=mongoose.model("Category",categoryschema)
export default category