const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const OrderItems = require('../models/orderItems.model');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await OrderItems.deleteMany();
});

describe('OrderItems API', () => {
    test('should create new order items', async () => {
        const res = await request(app)
            .post('/api/order-items')
            .send({
                orderId: new mongoose.Types.ObjectId(),
                productId: new mongoose.Types.ObjectId(),
                quantity: 3,
                price: 9.99
            });
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.quantity).toBe(3);
    });

    test('should get all order items', async () => {
        await OrderItems.create({
            orderId: new mongoose.Types.ObjectId(),
            productId: new mongoose.Types.ObjectId(),
            quantity: 1,
            price: 5.00
        });
        const res = await request(app)
            .get('/api/order-items');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get order items by id', async () => {
        const item = await OrderItems.create({
            orderId: new mongoose.Types.ObjectId(),
            productId: new mongoose.Types.ObjectId(),
            quantity: 2,
            price: 7.50
        });
        const res = await request(app)
            .get(`/api/order-items/${item._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toBe(item._id.toString());
    });

    test('should update order items', async () => {
        const item = await OrderItems.create({
            orderId: new mongoose.Types.ObjectId(),
            productId: new mongoose.Types.ObjectId(),
            quantity: 2,
            price: 7.50
        });
        const res = await request(app)
            .put(`/api/order-items/${item._id}`)
            .send({ quantity: 5 });
        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(5);
    });

    test('should delete order items', async () => {
        const item = await OrderItems.create({
            orderId: new mongoose.Types.ObjectId(),
            productId: new mongoose.Types.ObjectId(),
            quantity: 2,
            price: 7.50
        });
        const res = await request(app)
            .delete(`/api/order-items/${item._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});