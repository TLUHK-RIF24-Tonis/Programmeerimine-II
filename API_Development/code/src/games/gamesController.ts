import { Request, Response, NextFunction } from "express";
import gamesService from "./gamesService";
import CustomError from "../general/CustomError";

const getAllGames = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const games = await gamesService.getAllGames()

        return res.status(200).json ({
            success: true,
            message: `All games loaded!`,
            games,
        });
    } catch ( error ) {
        return next(error);
    }
};

const getGameById = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number(req.params.id);

        const game = await gamesService.getGameById(id);

        if (!game) {
            throw new CustomError(`Game does not exist!`, 404)
        }

        return res.status(200).json ({
            success: true,
            message: `Game found by ID!`,
            game,
        });
    } catch ( error ) {
        return next(error);
    }

};

const getUserGameById = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const userId = res.locals.user.id;
        const gameId = Number ( req.params.id );

        const game = await gamesService.getUserGameById( gameId, userId );

        if ( !game ) {
            throw new CustomError(`You are not part of this game id: ${gameId}!`, 404)
        }

        return res.status(200).json({
            success: true,
            message: `Game found!`,
            game
        })
    } catch ( error ) {
        return next(error);
    }
};

const createGame = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
    const { courseId, players } = req.body

    if (!courseId) {
        throw new CustomError(`CourseId is required!`, 400);
    }

    if (!Array.isArray(players) || players.length === 0) {
        throw new CustomError(`Players are required!`, 400);
    };
    if ( !players.every( p =>
        p &&
        typeof p === 'object' &&
        !Array.isArray(p) &&
        Number.isInteger( p.userId ) &&
        Number.isFinite( p.score )
    )) {
        return res.status(400).json ({
            success: false,
            message: `Each player must have a numberic userId and score!`
        })
    };

    const creatorId = res.locals.user.id;
    const createdGame = await gamesService.createGame( courseId, players, creatorId )

    return res.status (201).json({
        success: true,
        message: `Game created with ID: ${createdGame}`,
        id: createdGame
    })
    } catch ( error ) {
        return next(error);
    }
};

const getMyGames = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
    const userId = res.locals.user.id;
    const getGames = await gamesService.getAllUserGames(userId)

    if ( !getGames ) {
        throw new CustomError(`You have not played any game yet!`, 400);
    } else {
        return res.status(200).json({
            success: true,
            message: `All your games loaded:`,
            getGames
        });
    }
    } catch ( error ) {
        return next(error);
    }
};

const deleteGame = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
    const id = Number( req.params.id );

    const deleted = await gamesService.deleteGame(id);

    if ( !deleted ) {
        throw new CustomError(`Game with id: ${id} not found!`, 404);
    }
    
    return res.status(200).json({
        success: true,
        message: `Game with id: ${id} marked as deleted!`
    });
    } catch ( error ) {
        return next(error);
    }
};

const removeFromGame = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
    const userId = res.locals.user.id;
    const gameId = Number( req.params.id );

    const remove = await gamesService.removeUserFromGame( gameId, userId );

    if ( !remove ) {
        throw new CustomError(`Game with id: ${gameId} does not exist or user is not part of the game!`, 404);
    }

    return res.status(200).json({
        success: true,
        message: `You have been removed from game ${gameId}`
    });
    } catch ( error ) {
        return next(error);
    }
};

const updateGame = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
    const activeUser = Number(res.locals.user.id);
    const gameId = Number(req.params.id);
    const { playerId, score } = req.body;

    if ( 
        playerId === undefined &&
        score === undefined
    ) {
        throw new CustomError(`Atleast one field must be provided`, 400);
    }

    const parsedPlayerId = Number(playerId);
    if ( Number.isNaN(parsedPlayerId) ) {
        throw new CustomError(`PlayerId must be a number`, 400);
    }

    const existingGame = await gamesService.getGameMeta(gameId);

    if ( !existingGame ) {
        throw new CustomError(`Game not found!`, 404);
    }

    const isCreator = Number(existingGame.created_by) === activeUser;
    const isSelf = parsedPlayerId === activeUser;

    if ( !isCreator && !isSelf ) {
        throw new CustomError(`You are not allowed to modify this game`, 403);
    }

    const update = await gamesService.updatePlayerScore( gameId, parsedPlayerId, score);

    if ( !update ) {
        throw new CustomError(`Incorrect Player ID or Game ID!`, 403);
    }

    const updatedGame = await gamesService.getGameById( gameId );

    return res.status(200).json({
        success: true,
        message: `Game updated`,
        updatedGame
    });
    } catch ( error ) {
        return next(error);
    }
};

export default { getGameById, getAllGames, createGame, getMyGames, deleteGame, removeFromGame, getUserGameById, updateGame };
