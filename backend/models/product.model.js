const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    "name":{
        type: String,
        required: true
    },
    "price":{
        type: Number,
        required: true
    },
    "image_url":{
        type: String,
        required: true
    },
    "category_id":{
        type: String,
        required: true
    },
    "supplier_id":{
        type: String,
        required: true
    },
    "is_deleted":{
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;