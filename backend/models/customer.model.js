const mongoose = require('mongoose');
const User = require('./user.model');  // Import the existing user model


const customerSchema = new mongoose.Schema({
    address: {
        street: String,
        city: String
    },
    phone: {
        type: String,
        trim: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to an Order model (if you have one)
    }],
}, { timestamps: true });

// merging the user's controller with customer
customerSchema.add(User.schema);  

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
