import { IDiscs } from "./discsInterface";
import { discs, userDiscs, users } from "../data";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
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

const createDisc = async ( brand: string, model: string,type: IDiscs["type"] , speed: number, glide: number, turn: number, fade: number ): Promise<{ success: boolean, message: string, discId?: number }> => {

    const [exists] = await pool.query<RowDataPacket[]>(`
    SELECT id
    FROM discs
    WHERE brand = ? AND model = ? AND disc_type = ?
    LIMIT 1;
    `, [brand, model, type]);

    if ( exists.length > 0 ) {
        return {
            success: false,
            message: 'This disc already exists!'
        };
    }

    const [created] = await pool.query<ResultSetHeader>(`
        INSERT INTO discs
        (brand, model, disc_type, speed, glide, turn, fade)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [brand, model, type, speed, glide , turn, fade])

    return {
        success: true,
        message: "Disc created",
        discId: created.insertId,
    };
};

const deleteDisc = async ( id: number ): Promise<boolean> => {
    const [result]: [ ResultSetHeader, FieldPacket[] ] = await pool.query(`
        UPDATE discs
            SET deleted_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
                AND deleted_at IS NULL
        `, [id])
        return result.affectedRows > 0;
};

const updateDisc = async ( id: number, updates: Partial<Omit<IDiscs, 'id' | 'created_at' | 'updated_at'>> ): Promise<IDiscs | undefined> => {
    
    if (
        updates.brand === undefined &&
        updates.model === undefined &&
        updates.disc_type === undefined &&
        updates.speed === undefined &&
        updates.glide === undefined &&
        updates.turn === undefined &&
        updates.fade === undefined
    ) {
        return getDiscById(id);
    }

    const params: ( string | number | null )[] = [
        updates.brand ?? null,
        updates.model ?? null,
        updates.disc_type ?? null,
        updates.speed ?? null,
        updates.glide ?? null,
        updates.turn ?? null,
        updates.fade ?? null,
        id
    ];
    
    const [disc]: [ ResultSetHeader, FieldPacket[] ] =
    await pool.query<ResultSetHeader>(`
        UPDATE discs
            SET brand = COALESCE(?, brand),
                model = COALESCE(?, model),
                disc_type = COALESCE(?, disc_type),
                speed = COALESCE(?, speed),
                glide = COALESCE(?, glide),
                turn = COALESCE(?, turn),
                fade = COALESCE(?, fade),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
                AND deleted_at IS NULL;
        `, params);

    if ( disc.affectedRows === 0 ) {
        return undefined;
    }

    return getDiscById(id);
};

const getDiscById = async (id: number): Promise<IDiscs | undefined> => {
    const [disc]: [IDiscs[], FieldPacket[]] = await pool.query(`
        SELECT id, brand, model, disc_type as type, speed, glide, turn, fade,
        created_at as added FROM discs WHERE id = ? AND deleted_at IS NULL;
    `, [id])
    return disc[0];
};

const getAllDiscs = async (): Promise<IDiscs[]> => {
    const [discs]: [IDiscs[], FieldPacket[]] = await pool.query(`
        SELECT id, brand, model, disc_type as type, speed, glide, turn, fade,
        created_at as added FROM discs WHERE deleted_at IS NULL;
    `)
    return discs;
};

export default { getUserDiscs, userOwnDisc, getAllDiscs, getDiscById, createDisc, deleteDisc, updateDisc };
