import product from "../Model/productmodel.js";
import cart from "../Model/cartmodel.js";
import stripe from "stripe";
import asyncerror from "../ErrorMiddleware/asyncerror.js";




const addcart = asyncerror(async (req, res, next) => {
    const client = stripe(process.env.STRIPE_SECRETE_KEY);

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

    let totalProductPrice = 0;
    let totalTaxes = 0;

    function carttotal(productData, quantity) {
        const itemPrice = productData.price * quantity;
        totalProductPrice += itemPrice;
        totalTaxes += calculatetaxes(itemPrice);
    }

    const { cartid, item } = req.body;
    const cartdetail = await cart.findById(cartid);

    if (!cartdetail) {
        return res.status(404).json({ message: "Cart not found. Please create a cart first." });
    }

    for (const itemsdata of item) {
        const productItem = await product.findById(itemsdata.productId);
     console.log(productItem)
        if (!productItem) {
            return res.status(404).json({ message: "Product does not exist in the database." });
        }

        const existProduct = cartdetail.item.find((items) => items.productId.toString() === itemsdata.productId);

        if (!existProduct) {
            return res.status(400).json({ message: "Product not found in the cart. Please add the product to the cart first." });
        }

        carttotal(productItem, itemsdata.quantity);
    }

    const totalPrice = totalProductPrice + totalTaxes;
    console.log(totalPrice)

    const paymentIntent = await client.paymentIntents.create({
        amount: totalPrice * 100, 
        currency: 'usd',
        payment_method_types: ["card"],
            metadata:{
                orderid:"66d03d7b8f0b4b5ae374bb11"
            }
        }
    );

    // Return client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

const Addcartes = asyncerror(async (req, res, next) => {
    const { clientSecret, paymentMethodId } = req.body;
    const client = stripe(process.env.STRIPE_SECRETE_KEY);

    const confirmedPayment = await client.paymentIntents.confirm(clientSecret, {
        payment_method: paymentMethodId,
    });

    res.status(200).json({ message: "Payment confirmed", confirmedPayment });
});

// Webhook endpoint to handle Stripe events
const webhook = asyncerror(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
       let event = client.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // Handle the event
    // wecan update the status of the paymnet directly from there or we can also update in order
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
           res.status(200).json({message:"the paymnet has been added inn your account ",paymentIntent})
            break;
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            res.status(400).json({message:"the paymnet has been failed ",failedPaymentIntent})
            break;
       
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).json({ received: true });
});

export { addcart, Addcartes, webhook };
