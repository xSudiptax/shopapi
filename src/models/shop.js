const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: String,
    category: String,
    price: {
        type: Number,
        required: true
    },
    item_image: {
        type: String
    }
})

const ShopItem = new mongoose.model("ShopItem", shopItemSchema);

module.exports = ShopItem;