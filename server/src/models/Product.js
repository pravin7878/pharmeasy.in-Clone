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

  },
quantity : {
   type : Number,
   min: [0, "quantity must be greater than or equal to 0"],
   default : 0
},
  catagory : {
    type : String,
  },
  
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Seller ID is required"],
  },
});


// Hook to update `inStock` based on `quantity`
productSchema.pre("save", function (next) {
  this.inStock = this.quantity > 0;
  next();
});

module.exports = mongoose.model("Product", productSchema);
