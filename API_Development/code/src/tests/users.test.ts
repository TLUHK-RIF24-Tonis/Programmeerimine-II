import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import createTestUser from './helpers/factories';
import { expectSuccess, expectError, expectToken } from './helpers/expecters'
import pool from '../database';

let adminToken!: string;
let userToken!: string;

const newUser = createTestUser('user');
const adminUser = createTestUser('admin');

before(async () => {

    await request(app).post('/users').send(adminUser);
    await pool.query(`UPDATE users SET user_role = 'admin' WHERE email = ?`, [adminUser.email]);

    const adminRes = await request(app)
    .post('/auth/login')
    .send(adminUser);

    expect(adminRes.status).to.equal(200);

    expectToken(adminRes);
    adminToken = adminRes.body.token;

    await request(app).post('/users').send(newUser)

    const userRes = await request(app)
    .post('/auth/login')
    .send(newUser);

    expect(userRes.status).to.equal(200);
    expectToken(userRes);
    userToken = userRes.body.token;
});

describe('Users controller', () => {

    describe('POST /users', () => {
       it('Should create user', async () =>{
        const user = createTestUser();

        const res = await request(app).post('/users').send(user);
        expectSuccess(res, 201);
       });
    });

        it('Should fail when requied field are not provided', async () =>{
            const res = await request(app)
                .post('/users')
                .send({ email: 'random@test.com' });

            expectError(res, 400);
        });
    });
       it('Should fail when user already exists', async () =>{
            const user = createTestUser();

            await request(app).post('/users').send(user);
            const res = await request(app).post('/users').send(user);

            expectError(res, 400);
       });
       it('Should return status 200 and JWT token', async () =>{
        const response = await request(app)
            .post('/auth/login')
            .send(newUser);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.an('string');
       });
       it('Should return status 200 and JWT token', async () =>{
        const response = await request(app)
            .post('/auth/login')
            .send(adminUser);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.an('string');
       });
    describe('GET /users (admin)', () => {
       it('Returns status 200 and list of all users', async () =>{
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('users');
        expect(response.body.users).to.be.an('array');
       });
    });
    describe('GET /users (user)', () => {
       it('Returns status 403 and error message not authorized', async () =>{
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.an('string');
       });
    });
    describe('GET /users/me', () => {
       it('Returns status 200 and info about logged in user', async () =>{
        const response = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('currentUser');
        expect(response.body.currentUser).to.be.an('object');
       });
    });
    describe('GET /users/me', () => {
       it('Returns status 401 and error message not authorized', async () =>{
        const response = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${123123213131312}`);
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.an('string');
       });
    });
