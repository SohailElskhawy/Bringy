const request = require('supertest');
const app = require('../server');
const Supplier = require('../models/supplier.model');

describe('Supplier API', () => {
    test('should create a new supplier', async () => {
        const res = await request(app)
            .post('/api/suppliers/suppliers')
            .send({ name: 'Test Supplier' });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Test Supplier');
    });

    test('should get all suppliers', async () => {
        await Supplier.create({ name: 'Supplier 1' });
        const res = await request(app)
            .get('/api/suppliers/suppliers');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});