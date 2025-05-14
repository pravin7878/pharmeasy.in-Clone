const express = require("express");
const {
  checkoutBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  updateBookingQuantity,
  processRefund,
} = require("../controlers/booking");

const checkAccess = require("../middelware/chackAccess");
const protect = require("../middelware/protect");
const { organizer } = require("../utils/constent");

const router = express.Router();

router.use(protect);

const organizerAccess = [checkAccess(organizer)];

// Booking routes
router.route("/checkout").post(checkoutBooking); // Checkout process

router.route("/").get(getBookings); // Get all bookings for the user

router.route("/:id").get(getBookingById); // Get a specific booking by ID

router.route("/:id/cancel").put(cancelBooking); // Cancel a booking

router.route("/:id/quantity").put(updateBookingQuantity); // Update booking quantity

router.route("/:id/refund").put(...organizerAccess, processRefund); // Process refund (Admin only)

module.exports = router;
