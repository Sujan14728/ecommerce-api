const express = require("express")
const {
  addProduct,
  editProduct,
  deleteProduct,
  viewProduct,
} = require("../controllers/productController")

const router = express.Router()

router.post("/add", addProduct)
router.put("/edit/:id", editProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/view", viewProduct)

module.exports = router
