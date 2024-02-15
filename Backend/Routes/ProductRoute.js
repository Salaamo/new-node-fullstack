const express = require("express")
const router = express.Router()
const {createProduct} = require("../Controllers/ProductController")




router.post("/uploadProduct", createProduct)
module.exports = router

