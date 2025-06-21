const mongoose = require('mongoose');
const basketSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]


},
{
    timestamps: true
}
);

const Basket = mongoose.model('basket', basketSchema);

module.exports = Basket;