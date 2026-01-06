import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import createTestUser from './helpers/factories';
import { expectSuccess, expectError, expectToken } from './helpers/expecters'
import pool from '../database';
import * as jwt from 'jsonwebtoken';

let fakeToken!: string;
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

    fakeToken = jwt.sign(
       { id: 12345 },
       process.env.JWT_SECRET
    );
});

describe('Users controller', () => {

    describe('POST /users', () => {
       it('Should create user and return status 201', async () =>{
        const user = createTestUser();

        const res = await request(app)
            .post('/users')
            .send(user);

        expectSuccess(res, 201);
       });
        it('Should fail when requied field are not provided and return status 400', async () =>{
            const res = await request(app)
                .post('/users')
                .send({ email: 'random@test.com' });

            expectError(res, 400);
        });
       it('Should fail when user already exists and return status 400', async () =>{
            const user = createTestUser();

            await request(app).post('/users').send(user);

            const res = await request(app)
                .post('/users')
                .send(user);

            expectError(res, 400);
       });
    });
    describe('GET /users/me', () => {
       it('Returns status 404 and error message user with this id does not exist', async () =>{
        const res = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${fakeToken}`);

        expectError(res, 404);
       });
       it('Returns current user info and success status 200', async () =>{
        const res = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userToken}`);

        expectSuccess(res, 200);
       });
    });
    describe('PATCH /users/me', () => {
       it('Returns status 400 if no fields are provided', async () =>{
        const res = await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userToken}`)
            .send({});

        expectError(res, 400);
       });
       it('Returns status 404 if user does not exist', async () =>{
        const res = await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send({ email: 'suvalineJama@gmail.com' });

        expectError(res, 404);
       });
        it('Returns status 200 and user updated profile', async () =>{
        const res = await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ email: 'suvalineJama@gmail.com' });

        expectSuccess(res, 200);
       });
    });
    describe('PATCH /users/me (admin)', () => {
       it('Returns status 400 if no changes are inputed', async () =>{
        const res = await request(app)
            .patch('/users/4')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ email: undefined, username: undefined, password: undefined, role: undefined });

        expectError(res, 400);
       });
        it('Returns status 403 if user is not admin', async () =>{
        const res = await request(app)
            .patch('/users/4')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ email: undefined, username: undefined, password: undefined, role: undefined });

        expectError(res, 403);
       });
       it('Returns status 404 if user does not exist', async () =>{
        const res = await request(app)
            .patch('/users/20')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ email: 'ajutine@meil.com' });

        expectError(res, 404);
       });
        it('Returns status 200 and user profile successfuly updated', async () =>{
        const res = await request(app)
            .patch('/users/4')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ email: 'suvalineJama@gmail.com' });

        expectSuccess(res, 200);
       });
    });
    describe('GET /users (admin)', () => {
       it('Returns status 200 and list of all users', async () =>{
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${adminToken}`)

        expectSuccess(res, 200);
       });
        it('Returns status 403 and error message user has no privleges', async () =>{
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${userToken}`)

        expectError(res, 403);
       });
    });
});
