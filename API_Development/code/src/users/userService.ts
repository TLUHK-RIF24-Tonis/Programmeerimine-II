import IUsers, { IUsersData } from './usersInterface';
import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import hashService from '../general/hashService';

const getAllUsers = async () : Promise<IUsers[]> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, email, username, user_role as role, created_at as createdAt FROM users;');
    return rows;
};

const getUserById = async (id: number): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, email, username, user_role as role, created_at as createdAt, active as Active FROM users WHERE id = ?;', [id]);
    return rows[0];
};

const changeUserStatus = async (id: number): Promise<IUsers> => {
  await pool.query('UPDATE users SET active = NOT active, updated_at = CURRENT_TIMESTAMP WHERE id = ?;', [id]);
  const [rows]: [IUsers[], FieldPacket[]] = await pool.query('SELECT id, username , active FROM users WHERE id = ?;', [id]);
  return rows[0];
};

const createUser = async ( username:string ,email: string, password_hash: string, role = 'user' ) => {
    const sql = `
    INSERT INTO users ( username, email, password_hash, user_role )
    VALUES (?, ?, ?, ?);
    `
    const [result] = await pool.execute<ResultSetHeader>(sql, [username, email, password_hash, role]);
    return result;
};

const getUserByIdentifier = async ( identifier: string ): Promise<IUsers | undefined> => {
    const [rows]: [IUsers[], FieldPacket[]] = await pool.query(
        `SELECT id, email, username, user_role, created_at as createdAt,
        active as Active, password_hash as password
        FROM users WHERE email = ? OR username = ? LIMIT 1;`, [identifier, identifier]);
    return rows[0];
};

const deleteUser = async ( id: number ): Promise<boolean> => {
    const [deleted]: [ ResultSetHeader, FieldPacket[] ] =
        await pool.query<ResultSetHeader>(`
            UPDATE users
                SET deleted_at = CURRENT_TIMESTAMP,
                    updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND deleted_at IS NULL;
            `, [ id ]);

    return deleted.affectedRows > 0;
};

const updateUser = async ( id: number, updates: Partial<Omit<IUsers, 'id'>> ): Promise<IUsers | undefined> => {
    if (
        updates.email === undefined &&
        updates.username === undefined &&
        updates.password === undefined
    ) {
        return getUserById(id);
    }

    const hashedPassword = updates.password !== undefined 
                        ?hashService.hash(updates.password) : null;
    
    const params: ( string | number | null )[] = [
        updates.email ?? null,
        hashedPassword,
        updates.username ?? null,
        id
    ];

    const [result]: [ResultSetHeader, FieldPacket[]] =
        await pool.query<ResultSetHeader>(`
            UPDATE users
            SET email = COALESCE(?, email),
                password_hash = COALESCE(?, password_hash),
                username = COALESCE(?, username),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
                AND deleted_at IS NULL;
            `, params);

    if ( result.affectedRows === 0 ) {
        return undefined;
    }

    return getUserById(id);
}


export default { getUserById, changeUserStatus, createUser, getUserByIdentifier, getAllUsers, deleteUser, updateUser };
