const express = require("express");
const {
  updateProduct,
  getProductById,
  getAllProducts,
  createProduct,
  deleteProduct,
} = require("../controlers/product");
const protect = require("../middelware/protect");
const checkAccess = require("../middelware/chackAccess");
const { seller } = require("../utils/constent");
const validateProductBody = require("../middelware/productBodyValidater");

const router = express.Router();

// Middleware for routes that require protection and access control
const sellerAccess = [protect, checkAccess(seller),validateProductBody];

// CRUD routes
router
  .route("/")
  .get(getAllProducts)
  .post(...sellerAccess, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(...sellerAccess, updateProduct)
  .delete(...sellerAccess, deleteProduct);

module.exports = router;
