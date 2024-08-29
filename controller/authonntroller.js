import user from "../Model/usermodel.js";
import asyncerror from "../ErrorMiddleware/asyncerror.js";
import createToken from "../utils/jwt.js";
import mailtransfer from "../utils/nodemailer.js";
import twilio from "../utils/twilio.js";
import sendOTP from "../utils/twilio.js";
import resettoken from "../utils/crypo.js";
import { signuptemplate,forgottemplate } from "../utils/mailemplate.js";
const CreateUser=asyncerror(async(req,res,next)=>{
   console.log(req.body)
      const newuser= await user.create(req.body)
       const token= await createToken(newuser)
       mailtransfer(newuser.email)
// sendOTP(newuser.mobile)
        res.status(201).json({message:"the new entry has been created",token})
})
const login=asyncerror(async(req,res,next)=>{
   let {email,password}=req.body
   if(!email||!password){
    return   res.status(400).json({message:"please enter both email and passsword"})
   }
         let  existdata=await user.findOne({email})
         if(!existdata){
          return   res.status(400).json({message:"this email does not exist in my database"})
         }
             const data=  await existdata.comparePassword(password)
             if(!data){
               return res.status(400).json({message:"your password is incorrect"})
             }
             const token= await createToken(existdata)
             res.status(200).json({message:"successfully you have login",token})
})

   const getUser = asyncerror(async (req, res, next) => {
      const { id } = req.params;
      const users = await user.findById(id); 
      if (!users) {
          res.status(400).json({ message: "this id does not exist" });
      }
      res.status(200).json({ message: users });
  });
   const getallUser=asyncerror(async(req,res,next)=>{
         const userdata=await  user.find()
         res.status(200).json({message:"this is the list of all users",userdata})
   })
   const  updateuser= asyncerror(async (req, res, next) => {
      const { id } = req.params;
  
      const userid = await user.findById(id);
      if (!userid) {
          return res.status(400).json({ message: "User not found" });
      }
  
      const allowedFields = ["username", "email"];
      const updatedData = {};
  
      for (const key in req.body) {
          if (!allowedFields.includes(key)) {
              return res.status(400).json({ message: `${key} is not allowed to be updated` });
          }
          // i want to wrap the key value in double quote
         //  const wrappedkey=`"${key}"`
          updatedData[key] = req.body[key];
      }
  
      const updatedUser = await user.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
  });
  const  deleteuser=asyncerror(async (req, res, next) => {
   const { id } = req.params;
   const userdelete = await user.findByIdAndDelete(id);
   if (!userdelete) {
      return res.status(400).json({ message: "User not found" });
   }
   res.status(204).json({ message: "User deleted successfully" });
})
const forgotpassword=asyncerror(async(req,res,next)=>{
                     const {email}=req.body
                     const useremail=await user.findOne({email})
                     if(!useremail){
                        return res.status(400).json({email:"this email does not exist in db"})
                     }
                          const  {subject,text,html}=forgottemplate
                         const  currentdate=Date.now()
                         const expiredtime=5*60*1000
                        const  token=await resettoken()
                                 const newobject={currentdate,expiredtime,token}
                               const resetdata=  await user.findOneAndUpdate({email},newobject,{new:true,runValidators:true})
                               console.log(resetdata)
                        mailtransfer(email,subject,text,html,currentdate,expiredtime)

                        res.status(200).json({message:"the email was send to your email please check it",resetdata})
                         
})
const Resetpassword=asyncerror(async(req,res,next)=>{
       const   {id}= req.params
         const date=Date.now()
         const {password}=req.body
         const ifexist=await user.findOne({token:id})
         if(!ifexist){
           return  res.status(400).json({message:"your token is wrong"})
         }
         if(date- ifexist.currentdate>ifexist.expiredtime)
         {
          return   res.status(400).json({message:"sorry to day your token is expired"})
         }
                        const updateddata=await user.findOneAndUpdate({email:ifexist.email},password,{new:true,runValidators:true})
                         updateddata.token=undefined
                         updateddata.currentdate=undefined
                         updateddata.expiredtime=undefined
                    res.status(203).json({message:"the user password has been updated successully",updateddata})
})
export {CreateUser,login,getUser,getallUser,updateuser,deleteuser,forgotpassword,Resetpassword}
