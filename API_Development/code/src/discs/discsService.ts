import { IDiscs } from "./discsInterface";
import { discs, userDiscs, users } from "../data";
import { FieldPacket, RowDataPacket } from "mysql2";
import pool from "../database";

const getUserDiscs = async ( userId: number): Promise<IDiscs[] | undefined> => {
    const [userDiscs]: [IDiscs[], FieldPacket[]] = await pool.query(`
        SELECT u.id AS user_id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
             'disc_id', d.id,
             'brand', d.brand,
             'model', d.model,
             'disc_type', d.disc_type,
             'speed', d.speed,
             'glide', d.glide,
             'turn', d.turn,
             'fade', d.fade
            )
        ) AS discs
        FROM users u
        JOIN user_discs ud ON ud.user_id = u.id
        JOIN discs d ON d.id = ud.disc_id
        WHERE u.id = ?
        GROUP BY u.id;
        `, [ userId ])
    return userDiscs;
};

const userOwnDisc = async ( userId: number, discId: number): Promise<boolean> => {
    const [isDisc] = await pool.query<RowDataPacket[]>(`
        SELECT 1 FROM user_discs WHERE user_id = ? AND disc_id = ? LIMIT 1
        `, [ userId, discId])

        return isDisc.length > 0;
}

const createDisc = ( brand: string, model: string,type: IDiscs["type"] , speed: number, glide: number, turn: number, fade: number ) => {
    const id = discs[discs.length - 1].id + 1;

    const allDiscs = getAllDiscs();
    const exist = allDiscs.some(d => d.brand === brand && d.model === model);

    if ( exist ) return null;

    const disc: IDiscs | null = {
        id,
        brand,
        model,
        type,
        speed,
        glide,
        turn,
        fade,
    };
    discs.push(disc);
    return disc;
};

const getDiscById = async (id: number): Promise<IDiscs | undefined> => {
  const [disc]: [IDiscs[], FieldPacket[]] = await pool.query(`
    SELECT id, brand, model, disc_type as type, speed, glide, turn, fade, created_at as added FROM discs WHERE id = ?;
    `, [id])
    return disc[0];
};

const getAllDiscs = async (): Promise<IDiscs[]> => {
    const [discs]: [IDiscs[], FieldPacket[]] = await pool.query(`
        SELECT id, brand, model, disc_type as type, speed, glide, turn, fade, created_at as added FROM discs;
        `)
    return discs;
};

export default { getUserDiscs, userOwnDisc, getAllDiscs, getDiscById, createDisc };
