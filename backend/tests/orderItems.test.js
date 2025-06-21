const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const OrderItems = require('../models/orderItems.model');



describe('OrderItems API', () => {
    test('should create new order items', async () => {
        const res = await request(app)
            .post('/api/orderItems/order-items')
            .send({
                orderId: new mongoose.Types.ObjectId(),
                products: [
                    {
                        productId: new mongoose.Types.ObjectId(),
                        quantity: 2,
                        price: 10.00
                    },
                    {
                        productId: new mongoose.Types.ObjectId(),
                        quantity: 1,
                        price: 5.00
                    }
                ]
            });
        expect([200, 201]).toContain(res.statusCode);
    });

    
    test('should get order items by id', async () => {
        const item = await OrderItems.create({
            orderId: new mongoose.Types.ObjectId(),
            products: [
                {
                    productId: new mongoose.Types.ObjectId(),
                    quantity: 2,
                    price: 10.00
                },
                {
                    productId: new mongoose.Types.ObjectId(),
                    quantity: 1,
                    price: 5.00
                }
            ]
        });
        const res = await request(app)
            .get(`/api/orderItems/order-items/${item._id}`);
        expect(res.statusCode).toBe(200);
    });

});