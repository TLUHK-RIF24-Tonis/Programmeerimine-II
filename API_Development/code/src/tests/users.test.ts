import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

const newUser = {
    email: 'UusKasutaja@email.com',
    username: 'UusKasutaja',
    password: 'secret'
};

describe('Users controller', () => {
    describe('POST /users', () => {
       it('Should return status 201 and success message', async () =>{
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).to.equal(201);
        expect(response.body.success).to.equal(true);
       });
    });
    describe('POST /auth/login', () => {
       it('Should return status 200 and JWT token', async () =>{
        const response = await request(app)
            .post('/auth/login')
            .send(newUser);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.an('string');
       });
    });
});
