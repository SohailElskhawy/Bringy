const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Basket = require('../models/basket.model');

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
    await Basket.deleteMany();
});

describe('Basket API', () => {
    const customerId = new mongoose.Types.ObjectId();
    const productId = new mongoose.Types.ObjectId();

    test('add product to basket', async () => {
        const res = await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 1 });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Product added to basket successfully');
    });

    test('remove product from basket', async () => {
        // First, add a product
        await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        // Then, remove it
        const res = await request(app)
            .post('/api/basket/remove-product')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('increase product quantity', async () => {
        await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        const res = await request(app)
            .post('/api/basket/increase-quantity')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('decrease product quantity', async () => {
        await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 2 });

        const res = await request(app)
            .post('/api/basket/decrease-quantity')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('clear basket', async () => {
        await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        const res = await request(app)
            .post('/api/basket/clear')
            .send({ customerId });
        expect([200, 404]).toContain(res.statusCode);
    });
});
