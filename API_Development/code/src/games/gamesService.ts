import { games, users, courses } from "../data";
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

export default { getAllGames, getGameById, createGame, courses };
