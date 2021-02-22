const { expect } = require('chai');
const { createTables, dropTables } = require('../helpers/db');
const request = require('supertest');
const app = require('../../src');

before(async () => {
  await createTables();
});

describe('In auth routes', () => {
  describe('POST /api/auth/signup', () => {
    it('should return error for invalid body ', async () => {
      const reqBody = { something: 'random' };
      const res = await request(app).post('/api/auth/signup').send(reqBody);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.keys('error', 'detail');
    });

    it('should create account for valid body', async () => {
      const reqBody = { username: 'nabin', password: 'nabin' };
      const res = await request(app).post('/api/auth/signup').send(reqBody);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.keys('user', 'message');
      expect(res.body.user).to.have.keys('id', 'username', 'created_at');
      expect(res.body.user.username).to.equal(reqBody.username);
    });

    it('should return error for duplicate username', async () => {
      const reqBody = { username: 'nabin', password: 'nabin' };
      const res = await request(app).post('/api/auth/signup').send(reqBody);
      expect(res.status).to.equal(409);
      expect(res.body).to.have.keys('error', 'detail');
    });
  });

  describe('POST /api/auth/login', () => {
    it("shouldn't send token for random username", async () => {
      const reqBody = { username: 'random_user1' };
      const res = await request(app).post('/api/auth/login').send(reqBody);
      expect(res.status).to.equal(401);
      expect(res.body).to.have.keys('error', 'detail');
      expect(res.body.detail).to.have.key('username');
    });

    it("shouldn't send token for invalid password but valid username", async () => {
      const reqBody = { username: 'nabin', password: 'incorrect' };
      const res = await request(app).post('/api/auth/login').send(reqBody);
      expect(res.status).to.equal(401);
      expect(res.body).to.have.keys('error', 'detail');
      expect(res.body.detail).to.have.key('password');
    });

    it('should send token for valid crendentials', async () => {
      const reqBody = { username: 'nabin', password: 'nabin' };
      const res = await request(app).post('/api/auth/login').send(reqBody);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.keys('message', 'token');
    });
  });

  describe('GET /api/auth/', () => {
    it('should return error if user is not logged in', async () => {
      const res = await request(app).get('/api/auth/');
      expect(res.status).to.equal(401);
      expect(res.body).to.have.keys('error');
    });
  });
});

after(async () => {
  await dropTables();
});
