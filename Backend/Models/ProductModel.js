const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true,
    },
    ProductDescription: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: String,
        required: true,
    },
    ProductImage: {
        type: String,
        required: true,
    },
    ProductCategory: {
        type: String,
        required: true,
        enum: ["Electronics", "FoodStuffs", "Fashion", "Frangrance"]
    },
},{ timestamps: true }

);

let ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;