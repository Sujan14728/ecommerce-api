const jwt = require("jsonwebtoken")
const User = require("../models/User")

//Protected routes token base

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing or improperly formatted",
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error)
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
      error,
    })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      })
    }

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      })
    }

    next()
  } catch (error) {
    console.error("Error in isAdmin middleware:", error)
    res.status(500).send({
      success: false,
      message: "Server error in admin middleware",
      error,
    })
  }
}

module.exports = { requireSignIn, isAdmin }
