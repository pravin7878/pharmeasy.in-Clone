const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: [true, "Trip ID is required"],
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  refundStatus: {
    type: String,
    enum: ["not processed", "partial refund", "full refund", "no refund"],
    default: "not processed",
  },
  quantity: { type: Number, default: 1 },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
