import mongoose from "mongoose"
const cartschema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  item:[{
    productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }},
  {
  quantity:{
    type:Number,
    default:0
  }}],
  subtotal:{
    type:Number,
    default:0
  },
  Taxes:{
    type:Number,
    default:0
  },
  Total:{
    type:Number,
    default:0
  }

})
 const cart= mongoose.model("Cart",cartschema)
 export default cart