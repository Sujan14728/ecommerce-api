const Product = require("../models/Product")

//Reminder: add multer for storing images

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body
    const product = await new Product({
      name,
      description,
      price,
      category,
      stock,
      //   images,
    }).save()
    res.status(201).send({
      success: true,
      message: "Product added Successfully",
      product,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in adding product",
      error,
    })
  }
}

const editProduct = async (req, res) => {
  try {
    const newvalues = req.body
    const id = req.params.id
    const product = await Product.findOne({ _id: id })

    const updateQuery = await Product.updateMany(product, newvalues)

    return res.status(200).send({
      success: true,
      message: `Product with id:${id} is edited successfully`,
      updateQuery,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in editing Product",
      error,
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    const query = await Product.deleteOne({ _id: id })

    return res.status(200).send({
      success: true,
      message: `Product with id:${id} is deleted successfully`,
      query,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in deleting Product",
      error,
    })
  }
}

const viewProduct = async (req, res) => {}

module.exports = { addProduct, editProduct, deleteProduct, viewProduct }
