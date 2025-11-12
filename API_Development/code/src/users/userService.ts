import { users } from '../data';
import hashService from '../general/hashService';
import IUsers, { IUsersData } from './usersInterface';
import pool from '../database';
import { FieldPacket } from 'mysql2';

const getAllUsers = async () : Promise<IUsers[]> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, email, username, role, created_at as createdAt FROM users;');
    return rows;
};

const getUserById = async (id: number): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, email, username, role, created_at as createdAt, active as Active FROM users WHERE id = ?;', [id]);
    return rows[0];
};

const changeUserStatus = async (id: number): Promise<IUsers> => {
  await pool.query('UPDATE users SET active = NOT active WHERE id = ?', [id]);
  const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, username , active FROM users WHERE id = ?', [id]);
  return rows[0];
};

const createUser = (  username:string ,email: string, password: string ): number => {
    const id = users[users.length - 1].id + 1;

    const created: Date = new Date()
    const active: boolean = true;

    const hashed = hashService.hash(password);
    const newUser: IUsersData = {
        id,
        username,
        email,
        password: hashed,
        created,
        active,
        role: 'user',
    };

    users.push(newUser);

    return id;
};

const findUserByEmail = async ( email: string ): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT email FROM users WHERE email = ?;', [email]);
    return rows[0];
};

const findUserByUsername = ( username: string): IUsers | undefined => {
    const oldUsername = users.find((x => x.username === username));
    return oldUsername;
};


export default { getUserById, changeUserStatus, createUser, findUserByEmail, findUserByUsername, getAllUsers };
