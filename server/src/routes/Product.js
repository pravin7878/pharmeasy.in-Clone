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
const { organizer } = require("../utils/constent");
const validateProductBody = require("../middelware/productBodyValidater");

const router = express.Router();

// Middleware for routes that require protection and access control
const organizerAccess = [protect, checkAccess(organizer),validateProductBody];

// CRUD routes
router
  .route("/")
  .get(getAllProducts)
  .post(...organizerAccess, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(...organizerAccess, updateProduct)
  .delete(...organizerAccess, deleteProduct);

module.exports = router;
