const globalerror=(err,req,res,next)=>{
    err.message=err.message||"there is some internal server issue";
    err.statusCode=err.statusCode||500;
    res.status(err.statusCode).json({err,stack:err.stack,message:err.message})
}
export default globalerror