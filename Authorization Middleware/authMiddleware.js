import asyncerror from "../ErrorMiddleware/asyncerror.js";
import jwt from "jsonwebtoken"
import user from "../Model/usermodel.js";

const auth=async (req,res,next)=>{
      const header=req.header("Authorization")
    
      if(!header){
        return res.status(403).json({message:"unauthorized"})
      } 
          const token=header.split(" ")[1]
          if(!token){
            return res.status(403).json({message:"please provide a token"})
          }
          try{
             const decodeddata= jwt.verify(token,process.env.SECRET_KEY)
                          const   data= await user.findById(decodeddata.id)
                           if(!data){
                            return res.status(403).json({message:"user not found"})
                           }
                            req.user=data
                            console.log(data)
                            next()
          }
          catch(err){
               throw new Error(err)
          }
}
export default auth