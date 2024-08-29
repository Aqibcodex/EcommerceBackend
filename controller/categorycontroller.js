import asyncerror from "../ErrorMiddleware/asyncerror.js";
import category from "../Model/categorymodel.js";
const createcategory=asyncerror(async(req,res,next)=>{
    const newcategory=await category.create(req.body)
    res.status(201).json({message:"the new category has been added",newcategory})
})
const getcategory=asyncerror(async(req,res,next)=>{
       const {name}=req.params
        const data= await  category.findOne({name})
        if(!data){
            return res.status(400).json({message:"this category does not exist"})
        }
        res.status(200).json({message:data})
})
const getallcategory=asyncerror(async(req,res,next)=>{
      const alldata= await category.find()
      res.status(200).json({message:alldata})
})
const updatecategory=asyncerror(async(req,res,next)=>{
    const {name}=req.params
    const updateddata= await  category.findOneAndUpdate({name},req.body,{new:true,runValidators:true})
    if(!updateddata){
        return res.status(400).json({message:"this category does not exist"})
    }
    res.status(203).json({message:updateddata})
})
const deletecategory=asyncerror(async(req,res,next)=>{
    const {name}=req.params
    const deletedata= await  category.findOneAndDelete({name})
    if(!deletedata){
        return res.status(400).json({message:"this category does not exist"})
    }
    res.status(204).json({message:"the category has been deleted"})
})
export {createcategory,getcategory,getallcategory,updatecategory,deletecategory}