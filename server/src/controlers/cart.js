const Cart = require("../models/Cart");
const Product = require("../models/Product")

// Add product to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity." });
    }
    if(!userId) return res.status(400).json({message : "userId not found"})

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // If cart exists, check if the product already exists
      const productIndex = cart.product.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // If the product already exists, update its quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If the product is new to the cart, add it
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(201).json({ message: "Product added to cart"});
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

// Get user's cart
exports.getCart = async (req, res, next) => {
  const { userId } = req.user;
  try {
    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    const transformedProducts = cart.products.map((product) => ({
      ...product.productId.toObject(),  
      quantity: product.quantity,    
    }));

    
    res.status(200).json({
      userId: cart.userId,
      products: transformedProducts,
    });
  } catch (error) {
    next(error);
  }
};


// Remove product from cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart"});
  } catch (error) {
    next(error);
  }
};

// Clear user's cart
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
