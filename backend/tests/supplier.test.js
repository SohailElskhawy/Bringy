const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Supplier = require('../models/supplier.model');

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
    await Supplier.deleteMany();
});

describe('Supplier API', () => {
    test('should create a new supplier', async () => {
        const res = await request(app)
            .post('/api/suppliers')
            .send({ name: 'Test Supplier', contact: 'test@supplier.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Test Supplier');
    });

    test('should get all suppliers', async () => {
        await Supplier.create({ name: 'Supplier 1', contact: 's1@supplier.com' });
        const res = await request(app)
            .get('/api/suppliers');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get a supplier by id', async () => {
        const supplier = await Supplier.create({ name: 'Supplier 2', contact: 's2@supplier.com' });
        const res = await request(app)
            .get(`/api/suppliers/${supplier._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Supplier 2');
    });

    test('should update a supplier', async () => {
        const supplier = await Supplier.create({ name: 'Supplier 3', contact: 's3@supplier.com' });
        const res = await request(app)
            .put(`/api/suppliers/${supplier._id}`)
            .send({ name: 'Updated Supplier 3' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Supplier 3');
    });

    test('should delete a supplier', async () => {
        const supplier = await Supplier.create({ name: 'Supplier 4', contact: 's4@supplier.com' });
        const res = await request(app)
            .delete(`/api/suppliers/${supplier._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});