const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    "customerId":{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    "is_delivered":{
        type: Boolean,
        default: false
    },
    "paymentMethod":{
        type: String,
        required: true
    },
    "totalPrice":{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;