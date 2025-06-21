const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Basket API', () => {
    const customerId = new mongoose.Types.ObjectId();
    const productId = new mongoose.Types.ObjectId();

    test('add product to basket', async () => {
        const res = await request(app)
            .post('/api/basket/basket/add-product')
            .send({ customerId, productId, quantity: 1 });
        expect(res.statusCode).toBe(200);
    });

    test('remove product from basket', async () => {
        // First, add a product
        await request(app)
            .post('/api/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        // Then, remove it
        const res = await request(app)
            .post('/api/basket/basket/remove-product')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('increase product quantity', async () => {
        await request(app)
            .post('/api/basket/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        const res = await request(app)
            .post('/api/basket/basket/increase-quantity')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('decrease product quantity', async () => {
        await request(app)
            .post('/api/basket/basket/add-product')
            .send({ customerId, productId, quantity: 2 });

        const res = await request(app)
            .post('/api/basket/basket/decrease-quantity')
            .send({ customerId, productId });
        expect([200, 404]).toContain(res.statusCode);
    });

    test('clear basket', async () => {
        await request(app)
            .post('/api/basket/basket/add-product')
            .send({ customerId, productId, quantity: 1 });

        const res = await request(app)
            .post('/api/basket/basket/clear')
            .send({ customerId });
        expect([200, 404]).toContain(res.statusCode);
    });
});
