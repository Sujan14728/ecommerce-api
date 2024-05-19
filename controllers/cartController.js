const Cart = require("../models/Cart")
const User = require("../models/User")

const addToCart = async (req, res) => {
  try {
    const user_id = req.user._id
    const { product_id, quantity } = req.body
    const cart = await new Cart({
      product_id,
      user_id,
      quantity,
    }).save()

    res.status(200).send({
      success: true,
      message: "Product added to cart successfully",
      cart,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in addToCart",
      error,
    })
  }
}
const deleteFromCart = async (req, res) => {
  try {
    const user_id = req.user._id
    const cart_id = req.params.id
    const cart = await Cart.find({ user_id: user_id })
    if (user_id == cart[0].user_id) {
      const query = await Cart.deleteOne({ _id: cart_id })
      return res.status(200).send({
        success: true,
        message: `Cart with id:${cart_id} is deleted successfully`,
        query,
      })
    }
    return res.status(400).send({
      success: false,
      message: "You are not authorized to delete this cart",
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: "Server Error in deleteFromCart",
      error,
    })
  }
}

const viewCart = async (req, res) => {
  try {
    const user_id = req.user._id

    const cart = await Cart.find({ user_id: user_id })

    return res.status(200).send({
      success: true,
      message: "Cart fetched successfully",
      cart,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in viewCart",
      error,
    })
  }
}

module.exports = { addToCart, deleteFromCart, viewCart }
