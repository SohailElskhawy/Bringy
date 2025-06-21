const request = require('supertest');
const app = require('../server');

describe('User API', () => {
    test('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'TestPass123'
            });
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe('testuser@example.com');
    });

    test('should login a user', async () => {
        // First, register the user
        await request(app)
            .post('/api/users/register')
            .send({
                name: 'Login User',
                email: 'loginuser@example.com',
                password: 'LoginPass123'
            });

        // Then, login
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'loginuser@example.com',
                password: 'LoginPass123'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('should get user by id', async () => {
        const userRes = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Get User',
                email: 'getuser@example.com',
                password: 'GetPass123'
            });
        const userId = userRes.body.user.id;
        const res = await request(app)
            .get(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe('getuser@example.com');
    });
});