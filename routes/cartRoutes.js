const express = require("express")
const {
  addToCart,
  deleteFromCart,
  viewCart,
} = require("../controllers/cartController")

const { requireSignIn } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/add", requireSignIn, addToCart)
router.delete("/delete/:id", requireSignIn, deleteFromCart)
router.get("/view", requireSignIn, viewCart)

module.exports = router
