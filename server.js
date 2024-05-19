const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
require("dotenv").config()

//database config
connectDB()
app.use(express.json())

//routes
app.use("/api/v1/auth", authRoutes)

app.use("/product", productRoutes)

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  })
})

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} on http://localhost:${process.env.PORT}`
  )
})
