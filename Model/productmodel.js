import mongoose from "mongoose"
const productschmea= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name is necessary"]
    },
    price:{
        type:Number,
        required:[true,"the price is necessary"],
        default:0
    },
    image:{
        type:String,
       default :""
    },
    description:{
        type:String  
    },
    // varient: [{
    //     color: {
    //       type: String,
    //       enum: ["black", "red", "green", "blue", "white"]
    //     },
    //     size: {
    //       type: String,
    //       enum: ["small", "medium", "large"]
    //     }
    //   }],
      
  stock:{
    type:Number,
    default :0
  },
  rating:{
    type:Number,
    default:0,
    max:5
  },
//   reviews:[
//     {
//    user:{
//    type: mongoose.Schema.Types.ObjectId,
//    ref:"user"
//     },
//     rating:{
//         type:Number,
//         default:0,
//         max:5
//       },
   
//     text:String,
    
// }
//   ],
    date:{
        type:Date,
        default:Date.now()
    },
   subcategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subcategory"
   },
}
)
       const product=  mongoose.model("Product",productschmea)
       export default product