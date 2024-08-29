import cart from "../Model/cartmodel.js";
import asyncerror from "../ErrorMiddleware/asyncerror.js";
import product from "../Model/productmodel.js";

// Helper function to calculate taxes
function calculatetaxes(productPrice) {
    if (productPrice > 10 && productPrice < 280) {
        return productPrice * 5 / 100;
    } else if (productPrice >= 280 && productPrice <= 500) {
        return productPrice * 10 / 100;
    } else if (productPrice >= 500 && productPrice <= 1000) {
        return productPrice * 20 / 100;
    } else {
        return productPrice * 30 / 100;
    }
}
  let totalProductPrice=0;
  let totalTaxes=0
// Helper function to calculate total price and taxes
function carttotal(productData, quantity) {
    const itemPrice = productData.price * quantity;
    totalProductPrice += itemPrice;
    //console.log(totalProductPrice)
    totalTaxes += calculatetaxes(itemPrice);
}

// Create or update cart
const createcart = asyncerror(async (req, res, next) => {
  

    const { item, user } = req.body;
    let userCart = await cart.findOne({ user });

    if (!userCart) {
        // Create a new cart if it doesn't exist
        userCart = await cart.create(req.body);
        await userCart.populate("item.productId", "stock price");

        for (const itemDetail of item) {
            const foundProduct = await product.findById(itemDetail.productId);
            if (!foundProduct) {
                return res.status(400).json({ message: "This product does not exist" });
            }
            if (itemDetail.quantity > foundProduct.stock) {
                return res.status(400).json({ message: `Not enough stock for product ${foundProduct.name}` });
            }

            foundProduct.stock -= itemDetail.quantity;
            await foundProduct.save();

            carttotal(foundProduct, itemDetail.quantity);
        }

        // Return the total price including taxes
        const totalPrice = totalProductPrice + totalTaxes;
        return res.status(201).json({ message: "Cart created successfully", totalPrice });
    } else {
        for (const userProduct of item) {
            const foundProduct = await product.findById(userProduct.productId);
            if (!foundProduct) {
                return res.status(400).json({ message: "This product does not exist" });
            }

            const existingProduct = userCart.item.find(
                (detail) => detail.productId.toString() === userProduct.productId.toString()
            );

            if (existingProduct) {
                if (userProduct.quantity > foundProduct.stock) {
                    return res.status(400).json({ message: `Not enough stock for product ${foundProduct.name}` });
                }
                existingProduct.quantity += userProduct.quantity;
            } else {
                userCart.item.push(userProduct);
            }
       console.log(foundProduct,userProduct.quantity)
            carttotal(foundProduct, userProduct.quantity);
        }

        await userCart.save();
        const totalPrice = totalProductPrice + totalTaxes;
        // console.log(totalPrice)
        return res.status(200).json({ message: "Cart updated successfully", totalPrice });
        
}});

// Add stock to a product
const addstock = asyncerror(async (req, res, next) => {
    const { productid, stock } = req.body;
    const productes = await product.findById(productid);
    if (!productes) {
        return res.status(400).json({ message: "This product does not exist. First, create category and subcategory, then add a product detail, and finally add stock." });
    }
    productes.stock += stock;
    await productes.save();
    res.status(200).json({ message: "Your new stock has been added" });
});

// Get all carts
const Getallcart = asyncerror(async (req, res, next) => {
    const completedata = await cart.find();
    res.status(200).json({ message: completedata });
});

// Get a specific cart by ID
const Getacart = asyncerror(async (req, res, next) => {
    const { id } = req.params;
    const getdata = await cart.findById(id);
    if (!getdata) {
        return res.status(400).json({ message: "This cart data does not exist" });
    }
    res.status(200).json({ message: getdata });
});

// Update cart
const updatecart = asyncerror(async (req, res, next) => {
  
    
    const { Cartid, productid, quantity } = req.body;
    const cartdetail = await cart.findById(Cartid);
    if (!cartdetail) {
        return res.status(400).json({ message: "This cart data does not exist" });
    }
    const isexist = await product.findById(productid);
    if (!isexist) {
        return res.status(400).json({ message: "This product does not exist" });
    }

    const existproduct = cartdetail.item.find((data) => data.productId.toString() === productid.toString());
    if (!existproduct) {
        return res.status(400).json({ message: "This product does not exist in your cart" });
    }
    if (quantity > isexist.stock) {
        return res.status(400).json({ message: "You do not have enough stock of this product" });
    }
    existproduct.quantity += quantity;
    isexist.stock -= quantity;
    await isexist.save();
    await cartdetail.save();
    carttotal(isexist, quantity);

    
    const totalPrice = totalProductPrice + totalTaxes;
    return res.status(200).json({ message: "Cart updated successfully", totalPrice });
});
const deletecart=asyncerror(async(req,res,next)=>{
    const {cartid,productid}=req.body
    const cartdetails = await cart.findById(cartid);
    if (!cartdetails) {
        return res.status(400).json({ message: "This cart data does not exist" });
    }
   const  cartindex=cartdetails.item.findIndex((item)=>{return item.productId.toString()==productid})
    if(cartindex==-1){
        return res.status(400).json({ message: "This product does not exist in your cart"})
    }
      cartdetails.item.splice(cartindex,1)
      cartdetails.save()
      res.status(204).json({message:"no content found"})
})

export { createcart, addstock, Getallcart, Getacart, updatecart ,deletecart};
