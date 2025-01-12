const request = require('supertest');
const app = require('../app');

describe('Protected Routes', () => {
  let token;

  beforeAll(async () => {
    const signupRes = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    token = signupRes.body.token;
  });

  it('should allow access with a valid token', async () => {
    const res = await request(app)
      .get('/protected-route') // Replace with your protected route
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Access granted');
  });

  it('should deny access without a token', async () => {
    const res = await request(app).get('/protected-route');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('No token provided');
  });

  it('should deny access with an invalid token', async () => {
    const res = await request(app)
      .get('/protected-route')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid token');
  });
});
