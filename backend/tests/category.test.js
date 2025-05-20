const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Category = require('../models/category.model');

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
    await Category.deleteMany();
});

describe('Category API', () => {
    test('should create a new category', async () => {
        const res = await request(app)
            .post('/api/categories')
            .send({ name: 'Beverages' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Beverages');
    });

    test('should get all categories', async () => {
        await Category.create({ name: 'Snacks' });
        const res = await request(app)
            .get('/api/categories');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get a category by id', async () => {
        const category = await Category.create({ name: 'Dairy' });
        const res = await request(app)
            .get(`/api/categories/${category._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Dairy');
    });

    test('should update a category', async () => {
        const category = await Category.create({ name: 'Bakery' });
        const res = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({ name: 'Fresh Bakery' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Fresh Bakery');
    });

    test('should delete a category', async () => {
        const category = await Category.create({ name: 'Frozen' });
        const res = await request(app)
            .delete(`/api/categories/${category._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});