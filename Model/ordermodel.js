import mongoose from "mongoose"
 const orderschema= new mongoose.Schema({
    Cartid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    totalamount:{
        type:Number,
        default:0
    },
//   Address:[{
//     shipping_tem_address:{
//         type:String,
//         required:[true,"these temporary address is necessary"]
//     },
//     shipping_per_address:{
//         type:String,
//         required:[true,"these permanent address is necessary"]
//     }
//   }],
    paymentstatus:{
     type:String,
     enum:["pending","done"],
     default:"pending"
    },
    shipppingstatus:{
        type:String,
        enum:["pending","processing","delivered","cancelled","refund"],
        default:"pending"
    },
    Date:{
        type:Date,
        default:Date.now()
    }
 })
   const order=mongoose.model("Order",orderschema)
   export default order