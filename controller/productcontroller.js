import { syncIndexes } from 'mongoose';
import asyncerror from '../ErrorMiddleware/asyncerror.js';
import product from '../Model/productmodel.js';
const createproduct = asyncerror(async (req, res, next) => {
    if (!req.file) {
        return res.status(403).json({ message: 'Upload the image of the product' });
    }
    const newProductData = req.body;
    newProductData.image = req.file.filename;
    const newProduct = await (await (await product.create(newProductData))
        .populate("subcategory"))
        .populate("subcategory.category");

    res.status(201).json({
        message: 'The new product has been added',
        newProduct,
        file: req.file
    });
});
const getproduct=asyncerror(async(req,res,next)=>{
    const {name}=req.params
  const data=await (await  (await product.findOne({name})).populate("subcategory")).populate("subcategory.category")
    if(!data){
      return res.status(400).json({message:"this product does not exist"})
    }
  res.status(200).json({message:data})
})
const getallproduct = async (req, res, next) => {
  try {
      const allData = await product.find().populate('subcategory').populate('subcategory.category');
      res.status(200).json({ message: allData });
  } catch (error) {
      next(error);
  }
};
const updateproduct=asyncerror(async(req,res,next)=>{
  const {name}=req.params
  const updated=await (await  (await product.findOneAndUpdate({name},req.body,{new:true,runValidators:true})).populate("subcategory")).populate("subcategory.category")
    if(!updated){
      return res.status(400).json({message:"this product does not exist"})
    }
  res.status(200).json({message:updated})
})
const deleteproduct=asyncerror(async(req,res,next)=>{
  const {name}=req.params
  const data=await (await  (await product.findOneAndDelete({name})).populate("subcategory")).populate("subcategory.category")
  if(!data){
    return res.status(400).json({message:"this product does not exist"})
  }
  res.status(204).json({message:"this product has been deleted"})
})

export  { createproduct, getproduct, getallproduct, updateproduct,deleteproduct };
 
 //its mean everything is ok 
