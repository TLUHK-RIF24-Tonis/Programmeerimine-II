import { FieldPacket } from "mysql2";
import pool from "../database";
import { games, courses } from "../data";
import IGames from "./gamesInterface";

const getAllGames = (userId?: number, courseId?: number): IGames[] => {
    return games.filter(game => {
        if (userId && courseId) {
            return game.userId === userId && game.courseId === courseId;
        }
        if (userId) {
            return game.userId === userId;
        }
        if (courseId) {
            return game.courseId === courseId;
        }
        return true; // Tagastab kõik mängud?
    });
};

const getAllUserGames = async (userId: number) : Promise<IGames[]> => {
    const [rows]: [IGames[], FieldPacket[]] = await pool.query(
    `SELECT g.id AS game_id, c.course_name,
    JSON_ARRAYAGG( JSON_OBJECT(
        'username', u.username,
        'score', mp.score)
    ) AS players
    FROM games g
    JOIN multiplayer_games mp ON mp.game_id = g.id
    JOIN users u ON u.id = mp.user_id
    JOIN courses c ON c.id = g.course_id
    WHERE g.id IN (
    SELECT game_id FROM multiplayer_games WHERE user_id = ?
    )
    GROUP BY g.id, c.course_name;`, [ userId ]);
    return rows;
} 

const getGameById = (id: number): IGames | undefined => {
    const gameId = games.find(gameId => gameId.id === id);
    return gameId;
};

const createGame = ( datePlayed: Date, score: number, courseId: number, userId: number ): number => {
    const id = games[games.length - 1].id + 1;

    const game: IGames = {
        id,
        userId,
        courseId,
        datePlayed,
        score,
    };
    games.push(game);
    return id;
};

// Hetkel ei tööta päris nii nagu mõeldud, selleks vaja luua autentimis süsteem.
// Vaja oleks unikaalset ID-d või tokeni millega võrrelda.

export default { getAllGames, getGameById, createGame, getAllUserGames };
