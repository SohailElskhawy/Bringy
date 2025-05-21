const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Order = require('../models/order.model');



describe('Order API', () => {
    test('should create a new order', async () => {
        const res = await request(app)
            .post('/api/orders/orders')
            .send({
                customerId: new mongoose.Types.ObjectId(),
                is_delivered: false,
                paymentMethod: 'cash',
                totalPrice: 100.00,
                address: '123 Test St, Test City, TC 12345'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.is_delivered).toBe(false);
    });

    test('should get all orders', async () => {
        await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            is_delivered: false,
            paymentMethod: 'cash',
            totalPrice: 100.00,
            address: '123 Test St, Test City, TC 12345'
        });
        const res = await request(app)
            .get('/api/orders/orders');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get an order by id', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            is_delivered: false,
            paymentMethod: 'cash',
            totalPrice: 100.00,
            address: '123 Test St, Test City, TC 12345'
        });
        const res = await request(app)
            .get(`/api/orders/orders/${order._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toBe(order._id.toString());
    });

    test('should update an order', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            is_delivered: false,
            paymentMethod: 'cash',
            totalPrice: 100.00,
            address: '123 Test St, Test City, TC 12345'
        });
        const res = await request(app)
            .put(`/api/orders/orders/${order._id}`)
            .send({ is_delivered: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.is_delivered).toBe(true);
    });

    test('should delete an order', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            is_delivered: false,
            paymentMethod: 'cash',
            totalPrice: 100.00,
            address: '123 Test St, Test City, TC 12345'
        });
        const res = await request(app)
            .delete(`/api/orders/orders/${order._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});