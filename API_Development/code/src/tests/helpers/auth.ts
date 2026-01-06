import request from 'supertest';
import app from '../../app';
import { expectToken } from './expecters';

export async function loginUser(user: any) {
  const res = await request(app).post('/auth/login').send(user);
  expectToken(res);
  return res.body.token as string;
}

