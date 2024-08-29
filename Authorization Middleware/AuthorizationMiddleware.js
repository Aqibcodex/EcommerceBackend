// import { data } from "./authMiddleware.js"
const authorized=(req,res,next)=>{
      const   {Isadmin}=req.user
        if(!Isadmin){
            return res.status(403).json({message:"forbidden"})
        }
        next()
}
export default authorized