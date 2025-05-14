const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be greater than or equal to 0"],
  },

  inStock: {
    type: Boolean,
    required: [true, "Number of slots available is required"],
    min: [0, "Slots available must be greater than or equal to 0"],
  },

  catagory : {
    type : String,
  },
  
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Organizer ID is required"],
  },
});

module.exports = mongoose.model("Product", productSchema);
