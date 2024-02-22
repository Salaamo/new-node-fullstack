const express = require("express")
const router = express.Router()
const {createProduct, getProducts, deleteProduct} = require("../Controllers/ProductController")




router.post("/uploadProduct", createProduct)
router.get("/getProducts", getProducts)
router.delete("/deleteProducts", deleteProduct)
module.exports = router

