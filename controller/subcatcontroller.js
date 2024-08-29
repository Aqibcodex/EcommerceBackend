import asyncerror from "../ErrorMiddleware/asyncerror.js";
import subcategory from "../Model/subcatmodel.js";
const create=asyncerror(async(req,res,next)=>{
    const newSubcategory = await(await subcategory.create(req.body)).populate("category", "name _id");
    res.status(201).json({ message: "The new subcategory has been added", data: newSubcategory });
})
const getdata=asyncerror(async(req,res,next)=>{
      const {name}=req.params
      const data=await (subcategory.findOne({name}).populate("category","-_id"))
      if(!data){
        return res.status(400).json({message:"this subcategory does not exist"})
      }
      res.status(200).json({message:data})
})
const getall=asyncerror(async(req,res,next)=>{
    const data=await subcategory.find().populate("category","name _id")
    res.status(200).json({message:data})
})
const update=asyncerror(async(req,res,next)=>{
    const {name}=req.params
      const updateddata=await ( subcategory.findOneAndUpdate({name},req.body,{new:true,runValidators:true}).populate("category","-_id"))
      if(!updateddata){
        return res.status(400).json({message:"this subcategory does not exist"})
      }
      res.status(200).json({message:updateddata})
})
const deletesubcategory=asyncerror(async(req,res,next)=>{
    const {name}=req.params
    const deleteddata=await subcategory.findOneAndDelete({name})
    if(!deleteddata){
      return res.status(400).json({message:"this subcategory does not exist"})
    }
    res.status(200).json({message:"this subcategory has been deleted "})

})
export {create,getall,getdata,update,deletesubcategory}
