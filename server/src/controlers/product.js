const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res, next) => {
  const {userId} = req.user
  const { name, description, price, organizerId ,catagory,inStock } =
    req.body;
  try {
    const product = new Product({name , description  , price , organizerId ,catagory,inStock});
    const savedProduct = await product.save();
    res.status(201).json({ message: "New Trip Added Successfully", savedProduct });
  } catch (error) {
    next(error); 
  }
};

// Get all product
exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find().populate("organizerId", "name email");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "organizerId",
      "name email"
    );
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error; 
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
