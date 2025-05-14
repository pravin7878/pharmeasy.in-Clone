const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: [true, "Booking ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
    min: [0, "Amount must be greater than or equal to 0"],
  },
  paymentStatus: {
    type: String,
    enum: ["successful", "failed", "pending"],
    default: "pending",
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
