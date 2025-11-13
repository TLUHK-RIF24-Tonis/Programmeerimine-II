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

const createUser = async ( username:string ,email: string, password: string, role = 'user' ) => {
    const sql = `
    INSERT INTO users ( username, email, password_hash, role )
    VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(sql, [username, email, password, role]);
    return result;
};

const getUserByIdent = async ( email: string, username: string ): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query(
        `SELECT id, email, username, role, created_at as createdAt,
        active as Active FROM users WHERE email = ? OR username = ?;`, [email, username]);
    return rows[0];
};

const findUserByUsername = async ( username: string): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, email, username, role, created_at as createdAt, active FROM users WHERE username = ?;', [username]);
    return rows[0];
};

const findUserPassword = async ( id: number ): Promise<string | undefined> => {
    const [rows]: [any[], FieldPacket[]] = await pool.execute('SELECT password_hash FROM users WHERE id = ?;', [id]);
    return rows[0]?.password_hash;
}


export default { getUserById, changeUserStatus, createUser, getUserByIdent, findUserByUsername, getAllUsers, findUserPassword };
