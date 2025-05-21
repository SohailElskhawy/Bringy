const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Product = require('../models/product.model');


describe('Product API', () => {
    test('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products/products')
            .send({
                name: 'Test Product',
                price: 10.99,
                image_url: 'http://example.com/image.jpg',
                category_id: new mongoose.Types.ObjectId(),
                supplier_id: new mongoose.Types.ObjectId()
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Test Product');
    });

    test('should get all products', async () => {
        await Product.create({
            name: 'Another Product',
            price: 5.00,
            image_url: 'http://example.com/image2.jpg',
            category_id: new mongoose.Types.ObjectId(),
            supplier_id: new mongoose.Types.ObjectId()
        });
        const res = await request(app)
            .get('/api/products/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should get products by category', async () => {
        const categoryId = new mongoose.Types.ObjectId();
        await Product.create({
            name: 'Category Product',
            price: 7.00,
            image_url: 'http://example.com/image3.jpg',
            category_id: categoryId,
            supplier_id: new mongoose.Types.ObjectId()
        });
        const res = await request(app)
            .get(`/api/products/products/category/${categoryId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('should update a product', async () => {
        const product = await Product.create({
            name: 'Update Product',
            price: 8.00,
            image_url: 'http://example.com/image4.jpg',
            category_id: new mongoose.Types.ObjectId(),
            supplier_id: new mongoose.Types.ObjectId()
        });
        const res = await request(app)
            .put(`/api/products/products/${product._id}`)
            .send({ price: 12.00 });
        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(12.00);
    });

    test('should delete a product', async () => {
        const product = await Product.create({
            name: 'Delete Product',
            price: 6.00,
            image_url: 'http://example.com/image5.jpg',
            category_id: new mongoose.Types.ObjectId(),
            supplier_id: new mongoose.Types.ObjectId()
        });
        const res = await request(app)
            .delete(`/api/products/products/${product._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });
});