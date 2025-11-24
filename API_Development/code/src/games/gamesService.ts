import { FieldPacket } from "mysql2";
import pool from "../database";
import IGames from "./gamesInterface";
import { ResultSetHeader } from "mysql2";

const getAllGames = async () : Promise<IGames[]> => {
    const [rows]: [IGames[], FieldPacket[]] = await pool.query(`
        SELECT g.id AS game_id, c.course_name,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'user_id', mp.user_id,
                'username', u.username,
                'score', mp.score,
                'status', mp.status)
        ) AS players,
        COUNT(mp.user_id) AS player_count,
        CASE
            WHEN COUNT(mp.user_id) > 1 THEN 'multiplayer'
            ELSE 'singleplayer'
        END AS game_type
        FROM games g
        JOIN multiplayer_games mp ON mp.game_id = g.id
        JOIN users u ON u.id = mp.user_id
        JOIN courses c ON c.id = g.course_id
        GROUP BY g.id, c.course_name
        ORDER BY g.id;`);
    return rows;
};

const getAllUserGames = async (userId: number) : Promise<IGames[]> => {
    const [rows]: [IGames[], FieldPacket[]] = await pool.query(
        `SELECT g.id AS game_id, c.course_name,
        JSON_ARRAYAGG( 
            JSON_OBJECT(
            'username', u.username,
            'score', mp.score)
        ) AS players
        FROM games g
        JOIN multiplayer_games mp ON mp.game_id = g.id AND mp.left_at IS NULL
        JOIN users u ON u.id = mp.user_id
        JOIN courses c ON c.id = g.course_id
        WHERE g.id IN (
        SELECT game_id FROM multiplayer_games WHERE user_id = ? AND left_at IS NULL
        )
        GROUP BY g.id, c.course_name;`, [ userId ]);
    return rows;
} 

const getGameById = async (id: number): Promise<IGames | undefined> => {
    const [rows]: [IGames[], FieldPacket[]] = await pool.query(
        `SELECT g.id as game_id, c.course_name,
        JSON_ARRAYAGG(
            JSON_OBJECT(
            'username', u.username,
            'score', mp.score)
        ) AS players
        FROM games g
        JOIN multiplayer_games mp on mp.game_id = g.id
        JOIN users u ON u.id = mp.user_id
        JOIN courses c ON c.id = g.course_id
        WHERE g.id IN (
        SELECT game_id FROM multiplayer_games WHERE game_id = ?
        )
        GROUP BY g.id, c.course_name;`, [ id ])
    return rows[0];
};

const getUserGameById = async ( gameId: number, userId: number ): Promise<IGames | undefined> => {
    const [userGame]: [IGames[], FieldPacket[]] = await pool.query(`
        SELECT g.id AS game_id, c.course_name,
        JSON_ARRAYAGG( 
            JSON_OBJECT(
            'username', u.username,
            'score', mp.score)
        ) AS players
        FROM games g
        JOIN multiplayer_games mp ON mp.game_id = g.id AND mp.left_at IS NULL
        JOIN users u ON u.id = mp.user_id
        JOIN courses c ON c.id = g.course_id
        WHERE g.id = ? AND g.id IN (
        SELECT game_id FROM multiplayer_games WHERE user_id = ? AND left_at IS NULL
        )
        GROUP BY g.id, c.course_name;`, [ gameId, userId ]);

    return userGame[0];
}

interface InputPlayers {
    userId: number;
    score: number;
}

const createGame = async ( courseId: number, players: InputPlayers[] ): Promise<number> => {
    const [game] = await pool.query<ResultSetHeader>( `INSERT INTO games ( course_id ) VALUES (?);`, [courseId]);

    const gameId = game.insertId;

    for (const p of players) {
        await pool.query(
            `INSERT INTO multiplayer_games ( game_id, user_id, score ) VALUES (?, ?, ?);`, [gameId, p.userId, p.score]
        );
    }
    return gameId;
};

const deleteGame = async ( id: number ): Promise<Boolean> => {
    const [deleted]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(`
        UPDATE games
        SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND deleted_at IS NULL;
        `, [id]);

    return deleted.affectedRows > 0;
};

const removeUserFromGame = async ( gameId: number, userId: number ): Promise<Boolean> => {
    const [remove]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(`
        UPDATE multiplayer_games
        SET status = 'removed', left_at = CURRENT_TIMESTAMP
        WHERE game_id = ? AND user_id = ?;
        `, [gameId, userId]);

    return remove.affectedRows > 0;
};

export default { getAllGames, getGameById, createGame, getAllUserGames, deleteGame, removeUserFromGame, getUserGameById };
