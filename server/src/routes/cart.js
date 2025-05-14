const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controlers/cart");

const router = express.Router();

const protect = require("../middelware/protect");
router.use(protect)

// Cart routes
router
.route("/add")
.post(addToCart);

router
  .route("/")
  .get(getCart) // Get cart details
  .delete(clearCart); // Clear the entire cart

router
.route("/:productId")
.delete(removeFromCart);
 // Remove a product from cart

module.exports = router;
