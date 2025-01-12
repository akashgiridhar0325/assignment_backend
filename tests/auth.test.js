const request = require('supertest');
const app = require('../app');

describe('Authentication Routes', () => {
  describe('POST /signup', () => {
    it('should create a new user and return a JWT', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.username).toBe('testuser');
    });

    it('should return an error if email already exists', async () => {
      await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a JWT', async () => {
      await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.username).toBe('testuser');
    });

    it('should return an error for invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
