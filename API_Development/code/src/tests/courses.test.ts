import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import createTestUser from './helpers/factories';
import { expectSuccess, expectError, expectToken } from './helpers/expecters';
import * as jwt from 'jsonwebtoken';
import pool from '../database';

let fakeToken!: string;
let adminToken!: string;
let userToken!: string;
let courseId: number;

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

describe('Courses controller', () => {

    describe('GET /courses', () => {
        it('Should return 200 and all courses', async () =>{

            const res = await request(app)
                .get('/courses');

            expectSuccess(res, 200);
        });
    });
    describe('GET /courses when no courses exist', () => {

        beforeEach(async () => {
            await pool.query('DELETE FROM courses');
        });

        it('Should return 200 and empty array', async () =>{

        const res = await request(app)
            .get('/courses');

        expectSuccess(res, 200);
        });
    });
    describe('GET /courses/:id', () => {
        it('Should return 404 if there is no course', async () =>{

            const res = await request(app)
                .get('/courses/5000');

            expectError(res, 404);
        });

            beforeEach(async () => {
                await pool.query('DELETE FROM courses');

                const [result]: any = await pool.query(
                    'INSERT INTO courses (course_name, course_location, holes, par) VALUES (?, ?, ?, ?)',
                ['Kõrvemaa Discgolfipark', 'Kõrvemaa Matka- ja Suusakeskus', 18, 56]
            );

            courseId = result.insertId
            });

            it('Should return 200 and course', async () =>{
            const res = await request(app)
                .get(`/courses/${courseId}`);

            expectSuccess(res, 200);
        });
    });
    describe('POST /courses', () => {
        it('Should return 201 when course is succesfuly added', async () =>{

            const res = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${adminToken}`)
                .send( {name: 'Midagi suvalist', location: 'metsas', holes: 19, par: 62} );

            expectSuccess(res, 201);
        });
            it('Should return 400 if course name or location is empty', async () =>{

            const res = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${adminToken}`)
                .send( {name: 'Midagi suvalist', holes: 19, par: 62} );

            expectError(res, 400);
        });
            it('Should return 400 if hole number or PAR number is empty', async () =>{

            const res = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${adminToken}`)
                .send( {name: 'Midagi suvalist', location: 'metsas', par: 62} );

            expectError(res, 400);
        });
            it('Should return 409 if trying to insert course that already exist', async () =>{

            const res = await request(app)
                .post('/courses')
                .set('Authorization', `Bearer ${adminToken}`)
                .send( {name: 'Kõrvemaa Discgolfipark', location:'Kõrvemaa Matka- ja Suusakeskus', holes: 18, par: 56} );

            expectError(res, 409);
        });
    });
    describe('DELETE /courses/:id', () => {
        it('Should return 404 if no course found', async () =>{

            const res = await request(app)
            .delete('/courses/50')
            .set('Authorization', `Bearer ${adminToken}`);

            expectError(res, 404);
        });
        it('Should return 204 on succesful course soft-delete', async () =>{

            const res = await request(app)
            .delete(`/courses/${courseId}`)
            .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).to.equal(204);
        });
    });
    describe('PATCH /courses/:id', () => {
        it('Should return 404 if course does not exist', async () =>{

            const res = await request(app)
            .patch(`/courses/5555`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send( {course_name: 'Kõrvemaa Discgolfipark', course_location:'Kõrvemaa Matka- ja Suusakeskus', holes: 18 } );

            expectError(res, 404);
        });

        beforeEach(async () => {
            await pool.query('DELETE FROM courses');

            const [result]: any = await pool.query(
                'INSERT INTO courses (course_name, course_location, holes, par) VALUES (?, ?, ?, ?)',
            ['Kõrvemaa Discgolfipark', 'Kõrvemaa Matka- ja Suusakeskus', 18, 56]
        );

        courseId = result.insertId
        });

        it('Should return 400 if course input data is missing', async () =>{

        const res = await request(app)
        .patch(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send( { course_name: undefined, course_location: undefined } );

        expectError(res, 400);
        });
    });
});
