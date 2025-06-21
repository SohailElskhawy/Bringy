const mongoose = require('mongoose');
const orderItemsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
},
{
    timestamps: true
}
);

const OrderItems = mongoose.model('OrderItems', orderItemsSchema);

module.exports = OrderItems;