import mongoose from "mongoose"
const subcategoryschema=new mongoose.Schema({
          name:{
            type:String,
       
          },
          description:{
          type:String,
          
          },
          category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
          }
})

    const subcategory=mongoose.model("Subcategory",subcategoryschema)
    export default subcategory