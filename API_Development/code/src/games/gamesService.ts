import data from "../data";
import IGames from "./gamesInterface";

const getAllGames = (userId?: number, courseId?: number): IGames[] => {
    return data.games.filter(game => {
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
    const gameId = data.games.find(gameId => gameId.id === id);
    return gameId;
};

// Hetkel ei tööta päris nii nagu mõeldud, selleks vaja luua autentimis süsteem.
// Vaja oleks unikaalset ID-d või tokeni millega võrrelda.

export default { getAllGames, getGameById };
