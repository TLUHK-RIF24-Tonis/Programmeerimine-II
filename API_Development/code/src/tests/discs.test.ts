import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import { expectSuccess, expectError, createTestUser, loginUser } from './helpers';
import pool from '../database';
import * as jwt from 'jsonwebtoken';

let adminToken!: string;
let userToken!: string;
let discId!: number;
let fakeToken!: string;

const newUser = createTestUser('user');
const adminUser = createTestUser('admin');

before(async () => {
    await request(app)
    .post('/users')
    .send(adminUser);
    await pool.query(`UPDATE users SET user_role = 'admin' WHERE email = ?`, [adminUser.email]);

    const adminRes = await loginUser(adminUser)

    adminToken = adminRes;

    await request(app).post('/users').send(newUser)

    const userRes = await loginUser(newUser)

    userToken = userRes;

    fakeToken = jwt.sign(
        { id: 12345 },
        process.env.JWT_SECRET
    );
})

describe('Discs controller', () => {

    describe('GET /discs', () => {
       it('Should return status 200 and all discs', async () =>{

            const res = await request(app)
                .get('/discs')
                .set('Authorization', `Bearer ${userToken}`);

            expectSuccess(res, 200);
       });
    });
    describe('GET /discs when discs is empty array', () => {
        it('Should return status 200 with empty discs array', async () =>{

            beforeEach(async () => {
                await pool.query('DELETE FROM discs');
            });

            const res = await request(app)
                .get('/discs')
                .set('Authorization', `Bearer ${userToken}`);

                expect(res.body).to.have.property('discs')
                expect(res.body.discs).to.be.an('array')

            expectSuccess(res, 200);
       });
    });
    describe('GET /discs/:id when there is not disc', () => {
        it('Should return status 404 if no disc found', async () =>{

            const res = await request(app)
                .get('/discs/8')
                .set('Authorization', `Bearer ${userToken}`);

            expectError(res, 404);
       });
    });
    describe('GET /discs/:id', () => {
       beforeEach(async () => {

            const [result]: any = await pool.query(
                'INSERT INTO discs (brand, model, disc_type, speed, glide, turn, fade) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['Innova', 'Destroyer', 'Driver', 12, 5, -2.5, 3]
            );

            discId = result.insertId
        });

        it('Should return status 200 with :id disc info', async () =>{

            const res = await request(app)
                .get(`/discs/${discId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expectSuccess(res, 200);
       });
    });
    describe('GET /discs/me', () => {
        
        let discId: number;
        let userId: number;
        let token: string;

       beforeEach(async () => {

            await pool.query('DELETE FROM user_discs');
            await pool.query('DELETE FROM discs');

            const [discResult]: any = await pool.query(
                'INSERT INTO discs (brand, model, disc_type, speed, glide, turn, fade) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['Innova', 'Destroyer', 'Driver', 12, 5, -2.5, 3]
            );

            discId = discResult.insertId

            const [userResult]: any = await pool.query(
                'INSERT INTO users (email, username, password_hash, active, user_role) VALUES (?, ?, ?, ?, ?)', ['test@test.test', 'test', 'irrelevant', true, 'user']
            )

            userId = userResult.insertId

            await pool.query(
                'INSERT INTO user_discs (user_id, disc_id) VALUES (?, ?)',
                [userId, discId]
            );

            token = jwt.sign({ id: userId, role: 'user' }, process.env.JWT_SECRET)
        });
        it('Should return status 200 with :id disc info', async () =>{

        const res = await request(app)
            .get(`/discs/me?userId=${userId}`)
            .set('Authorization', `Bearer ${adminToken}`)

        expectSuccess(res, 200);
        });
    });
    describe('GET /discs/user/:id', () => {
        it('Should return status 200 and users discs', async () => {
            const res = await request(app)
                .get('/discs/user/3')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expectSuccess(res, 200)
            expect(res.body).to.have.property('userDiscs')
            expect(res.body.userDiscs).to.be.an('array');
        });

        it('Should return status 200 and empty array that showing user not owning discs', async () => {

            await pool.query("DELETE FROM user_discs WHERE user_id = ?", [3])

            const res = await request(app)
                .get('/discs/user/3')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expectSuccess(res, 200);
        });
    })
    describe('GET /discs/user/disc/check', () => {
        it('Should return status 200 if user have this disc', async () => {

            let discId: number;
            let userId: number;

            await pool.query('DELETE FROM users WHERE email = "test@test.test"');

            const [discResult]: any = await pool.query(
                'INSERT INTO discs (brand, model, disc_type, speed, glide, turn, fade) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['Innova', 'Destroyer', 'Driver', 12, 5, -2.5, 3]
            );

            discId = discResult.insertId

            const [userResult]: any = await pool.query(
                'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)', ['test@test.test', 'test', 'hashed']
            )

            userId = userResult.insertId

            await pool.query("INSERT INTO user_discs ( user_id, disc_id ) VALUES (?, ?)", [userId, discId])

            const res = await request(app)
                .get('/discs/user/disc/check')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ userId, discId });
            
            expectSuccess(res, 200);
        });
        it('Should return status 400 if inputed ID-s are not positive numbers', async () => {
            const res = await request(app)
                .get('/discs/user/disc/check')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ userId: 'asdf', discId: -10 });
            
            expectError(res, 400);
        });
        it('Should return status 404 if disc not exist', async () => {
            const res = await request(app)
                .get('/discs/user/disc/check')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ userId: 3, discId: 20 });
            
            expectError(res, 404);
        });
        it('Should return status 404 if user not exist', async () => {
            const res = await request(app)
                .get('/discs/user/disc/check')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ userId: 3000, discId: 1 });
            
            expectError(res, 404);
        });
        it('Should return status 404 user does not have this disc!', async () => {
            const res = await request(app)
                .get('/discs/user/disc/check')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ userId: 1, discId: 5 });
            
            expectError(res, 404);
        });
    });
    describe('POST /add/:id', () => {
        it('Should return status 404 if disc id is invalid', async () => {
            const res = await request(app)
                .post('/discs/add/abc')
                .set('Authorization', `Bearer ${userToken}`);
            
            expectError(res, 404);
        });
        it('Should return status 404 if user id is invalid', async () => {
            const res = await request(app)
                .post('/discs/add/1')
                .set('Authorization', `Bearer ${fakeToken}`);
            
            expectError(res, 404);
        });
        it('Should return status 404 if no disc found', async () => {

            const res = await request(app)
                .post('/discs/add/1000')
                .set('Authorization', `Bearer ${userToken}`);
            
            expectError(res, 404);
        });
        it('Should return status 404 if no user found', async () => {

            const res = await request(app)
                .post('/discs/add/1')
                .set('Authorization', `Bearer ${fakeToken}`);
            
            expectError(res, 404);
        });
        it('Should return status 200 when disc succsefuly added to collection', async () => {

            let discId: number;

            const [discResult]: any = await pool.query(
                'INSERT INTO discs (brand, model, disc_type, speed, glide, turn, fade) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['Innova', 'Destroyer', 'Driver', 12, 5, -2.5, 3]
            );

            discId = discResult.insertId

            const res = await request(app)
                .post(`/discs/add/${discId}`)
                .set('Authorization', `Bearer ${userToken}`);
            
            expectSuccess(res, 200);
        });
    })
    describe('POST /discs (admin)', () => {
        it('Should return status 201 and new disc created', async () => {
            const res = await request(app)
                .post('/discs')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ brand: 'Discraft', model: 'Force', type: 'Driver', speed: 12, glide: 5, turn: 0, fade: 3 });
            
            expectSuccess(res, 201);
        });
        it('Should return status 400 if brand, model or type missing', async () => {
            const res = await request(app)
                .post('/discs')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ brand: '', model: 'Force', type: 'Driver', speed: 12, glide: 5, turn: 0, fade: 3 });
            
            expectError(res, 400);
        });
        it('Should return status 400 if speed, glide, turn or fade is missing', async () => {
            const res = await request(app)
                .post('/discs')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ brand: 'Discraft', model: 'Force', type: 'Driver', speed: '', glide: 5, turn: 0, fade: 3 });
            
            expectError(res, 400);
        });
    });
    describe('DELETE /discs/:id (admin)', () => {
        it('Should return status 404 when disc not found', async () => {
            const res = await request(app)
                .delete('/discs/500')
                .set('Authorization', `Bearer ${adminToken}`)
            
            console.log(res.body)

            expectError(res, 404);
        });
        it('Should return status 400 if brand, model or type missing', async () => {
            const res = await request(app)
                .post('/discs/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ brand: '', model: 'Force', type: 'Driver', speed: 12, glide: 5, turn: 0, fade: 3 });
            
            expectError(res, 400);
        });
        it('Should return status 400 if speed, glide, turn or fade is missing', async () => {
            const res = await request(app)
                .post('/discs')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ brand: 'Discraft', model: 'Force', type: 'Driver', speed: '', glide: 5, turn: 0, fade: 3 });
            
            expectError(res, 400);
        });
    });
});