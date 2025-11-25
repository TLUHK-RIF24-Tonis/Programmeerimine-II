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
        throw new CustomError(`CourseId is required!`, 404);
    }
    
    if (!Array.isArray(players) || players.length === 0) {
        throw new CustomError(`Players are required!`, 400);
    };

    const creatorId = res.locals.user.id;
    const createdGame = await gamesService.createGame( courseId, players, creatorId )

    return res.status (201).json({
        success: true,
        message: `Game created with ID:${createdGame}`
    })
    } catch ( error ) {
        return next(error);
    }
};

const getMyGames = async ( req: Request, res: Response ) => {
    const userId = res.locals.user.id;

    const getGames = await gamesService.getAllUserGames(userId)
    if ( !getGames ) {
        return res.status(400).json({
            success: false,
            message: `You have not played any game yet!`
        })
    } else {
        return res.status(200).json({
            success: true,
            message: `All you games loaded:`,
            getGames
        })
    }
};

const deleteGame = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );

    const deleted = await gamesService.deleteGame(id);

    if ( !deleted ) {
        return res.status(404).json({
            success: false,
            message: `Game with id: ${id} not found!`
        });
    }
    
    return res.status(200).json({
        success: true,
        message: `Game with id: ${id} marked as deleted!`
    })

};

const removeFromGame = async ( req: Request, res: Response ) => {
    const userId = res.locals.user.id;
    const gameId = Number( req.params.id );

    const remove = await gamesService.removeUserFromGame( gameId, userId );

    if ( !remove ) {
        return res.status(404).json({
            success: false,
            message: `Game with id: ${gameId} does not exist or user is not part of the game!`
        })
    }

    return res.status(200).json({
        success: true,
        message: `You have been removed from game ${gameId}`
    })
};

const updateGame = async ( req: Request, res: Response ) => {
    const activeUser = Number(res.locals.user.id);
    const gameId = Number(req.params.id);
    const { playerId, score, datePlayed } = req.body;

    if ( 
        playerId === undefined &&
        score === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: `Atleast one field must be provided`
        })
    }

    const parsedPlayerId = Number(playerId);
    if ( Number.isNaN(parsedPlayerId) ) {
        return res.status(400).json({
            success: false,
            message: `PlayerId must be a number`
        });
    }

    const existingGame = await gamesService.getGameMeta(gameId);

    if ( !existingGame ) {
        return res.status(404).json({
            success: false,
            message: `Game not found!`
        });
    }

    const isCreator = Number(existingGame.created_by) === activeUser;
    const isSelf = parsedPlayerId === activeUser;

    if ( !isCreator && !isSelf ) {
        return res.status(403).json({
            success: false,
            message: `You are not allowed to modify this game`
        });
    }

    const update = await gamesService.updatePlayerScore( gameId, parsedPlayerId, score);

    if ( !update ) {
        return res.status(403).json({
            success: false,
            message: `Incorrect Player ID or Game ID!`
        });
    }

    const updatedGame = await gamesService.getGameById( gameId );

    return res.status(200).json({
        success: true,
        message: `Game updated`,
        updatedGame
    });
};

export default { getGameById, getAllGames, createGame, getMyGames, deleteGame, removeFromGame, getUserGameById, updateGame };
