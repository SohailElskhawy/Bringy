const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Order = require('../models/order.model');

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
    await Order.deleteMany();
});

describe('Order API', () => {
    test('should create a new order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({
                customerId: new mongoose.Types.ObjectId(),
                products: [
                    { productId: new mongoose.Types.ObjectId(), quantity: 2 }
                ],
                total: 25.99,
                status: 'pending'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.status).toBe('pending');
    });

    test('should get all orders', async () => {
        await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            products: [
                { productId: new mongoose.Types.ObjectId(), quantity: 1 }
            ],
            total: 10.00,
            status: 'pending'
        });
        const res = await request(app)
            .get('/api/orders');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get an order by id', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            products: [
                { productId: new mongoose.Types.ObjectId(), quantity: 1 }
            ],
            total: 15.00,
            status: 'pending'
        });
        const res = await request(app)
            .get(`/api/orders/${order._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toBe(order._id.toString());
    });

    test('should update an order', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            products: [
                { productId: new mongoose.Types.ObjectId(), quantity: 1 }
            ],
            total: 20.00,
            status: 'pending'
        });
        const res = await request(app)
            .put(`/api/orders/${order._id}`)
            .send({ status: 'completed' });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('completed');
    });

    test('should delete an order', async () => {
        const order = await Order.create({
            customerId: new mongoose.Types.ObjectId(),
            products: [
                { productId: new mongoose.Types.ObjectId(), quantity: 1 }
            ],
            total: 30.00,
            status: 'pending'
        });
        const res = await request(app)
            .delete(`/api/orders/${order._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});