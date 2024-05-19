const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchema)
