import { users } from '../data';
import hashService from '../general/hashService';
import IUsers, { IUsersData } from './usersInterface';
import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';

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

const createUser = async ( username:string ,email: string, password_hash: string, role = 'user' ) => {
    const sql = `
    INSERT INTO users ( username, email, password_hash, role )
    VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(sql, [username, email, password_hash, role]);
    return result;
};

const getUserByIdentifier = async ( identifier: string ): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query(
        `SELECT id, email, username, role, created_at as createdAt,
        active as Active, password_hash as password
        FROM users WHERE email = ? OR username = ? LIMIT 1;`, [identifier, identifier]);
    return rows[0];
};


export default { getUserById, changeUserStatus, createUser, getUserByIdentifier, getAllUsers };
