import asyncerror from "../ErrorMiddleware/asyncerror.js";
import order from "../Model/ordermodel.js";
import stripe from "stripe"
const createorder=asyncerror(async(req,res,next)=>{
   const  {Cartid,totalamount,paymentstatus,shipppingstatus,Date}=req.body
   console.log(paymentstatus)
    const user= await order.findOne({Cartid})
    if(!user)
    {
          const neworder  = await (await(await order.create(req.body)).populate("Cartid")).populate("Cartid.user","username")
          return res.status(201).json({message:"the new order has been created",neworder})
    }
         user.totalamount=totalamount
        //  user.Address.push(Address)
         user.paymentstatus=paymentstatus?paymentstatus:"pending"
         user.shipppingstatus=shipppingstatus?shipppingstatus:"pending"
         user.Date=Date
         await user.save()
         res.status(200).json({message:"your order has been updated",user})
         })
const getallorder=asyncerror(async(req,res,next)=>{
    const completeorder=  await order.find()
    res.status(200).json({message:completeorder})
})
const updateOrder = asyncerror(async (req, res, next) => {
    const { id } = req.params;
    const {Isadmin } = req.user; 
   
    const allowedUserFields = ["Cartid", "totalamount",  "Date"];
    const allowedAdminFields = ["Cartid", "totalamount",  "paymentstatus", "shipppingstatus", "Date"];

    
    const allowedFields = Isadmin === 'admin' ? allowedAdminFields : allowedUserFields;
    for (const data in req.body) {
        if (!allowedFields.includes(data)) {
            return res.status(403).json({ message: "This field is forbidden" });
        }
    }

    const updatedOrder = await order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedOrder) {
        return res.status(400).json({ message: "The id you entered is wrong" });
    }
    res.status(200).json({ message: "Your order has been updated", updatedOrder });
})
const trackOrder = asyncerror(async (req, res, next) => {
    const { id } = req.params; 

    const orderData = await order.findById(id);

    if (!orderData) {
        return res.status(404).json({ message: "Order not found" });
    }


    res.status(200).json({
        message: "Order details fetched successfully",
        order: {
            totalamount: orderData.totalamount,
            // Address: orderData.Address,
            paymentstatus: orderData.paymentstatus,
            shipppingstatus: orderData.shipppingstatus,
            Date: orderData.Date
        }
    });
});

   // this is a refund api
   const refund=asyncerror(async(req,res,next)=>{
      const client=stripe(process.env.STRIPE_SECRETE_KEY)
          const {paymentintentid,orderid}=req.body
          if(!paymentintentid||!orderid){
            return res.status(400).json({message:"please provide paymentintent and  orderid"})
          }
         const isexist=   await order.findById(orderid)
         if(!isexist){
    return res.status(400).json({message:"this order id is wrong this is not exist"})
         }
            if(isexist.shipppingstatus==="refund")
            {
                return res.status(400).json({message:"you have already refund the money ccheck your status"})
            }
        const paymentdata=   await  client.paymentIntents.retrieve(paymentintentid)
        if(!paymentdata){
            return res.status(400).json({message:"this paymnet does not exist"})
        }
        console.log(paymentdata)
      const refundDetail=await client.refunds.create({
           payment_intent:paymentintentid,
           amount:1200*100
           })
           isexist.shipppingstatus = "refund";
             await isexist.save();

    // Send a success response
    return res.status(200).json({ message: "Refund successful", refundDetail });

   })


export {createorder,getallorder,trackOrder,updateOrder,refund}