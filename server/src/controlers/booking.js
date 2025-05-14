const Booking = require("../models/Booking");
const Cart = require("../models/Cart");

// Checkout and confirm booking
const checkoutBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Retrieve user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.trips.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create booking records for each trip in the cart
    const bookings = cart.trips.map((trip) => ({
      userId,
      tripId: trip.tripId,
      quantity: trip.quantity,
    }));

    await Booking.insertMany(bookings);

    // Clear user's cart after successful booking
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Booking confirmed!", bookings });
  } catch (error) {
    next(error);
  }
};

// Get all bookings for a user
const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "tripId"
    );

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Get booking by ID
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("tripId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Cancel a booking
const cancelBooking = async (req, res, next) => {
  try {
    const { refundStatus } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, status: "confirmed" },
      { status: "cancelled", refundStatus: refundStatus || "not processed" },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or already cancelled" });
    }

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    next(error);
  }
};

// Update booking quantity
const updateBookingQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, status: "confirmed" },
      { quantity },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or cannot be updated" });
    }

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    next(error);
  }
};

// Process refund for a booking (Admin functionality)
const processRefund = async (req, res, next) => {
  try {
    const { refundStatus } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      { refundStatus },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Refund status updated", booking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkoutBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  updateBookingQuantity,
  processRefund,
};
