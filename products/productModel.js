const mongoose = require("mongoose");

const ProductSchema=mongoose.Schema(
    {
        name: String,
        description: String,
        category: String,
        image: String,
        postedAt: Date,
        price: String,
    },
    {
        versionKey:false,
        timeStamps:false
    }
)

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel 