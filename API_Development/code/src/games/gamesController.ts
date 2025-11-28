import { Request, Response } from "express";
import gamesService from "./gamesService";

const getAllGames = async ( req: Request, res: Response ) => {
    const games = await gamesService.getAllGames()

    return res.status(200).json ({
        success: true,
        message: `All games loaded!`,
        games,
    });
};

const getGameById = async ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const game = await gamesService.getGameById(id);

    if (!game) {
        return res.status(404).json ({
            success: false,
            message: `Game does not exist!`
        })
    }

    return res.status(200).json ({
        success: true,
        message: `Game found by ID!`,
        game,
    });
};

const createGame = async ( req: Request, res: Response ) => {
    const { courseId, players } = req.body

    if (!courseId)
        return res.status(400).json({
            success: false,
            message: `CourseId is required!`
    });
    if (!Array.isArray(players) || players.length === 0) {
        return res.status(400).json({
            success: false,
            message: `Players are required!`
        });
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

    const createdGame = await gamesService.createGame( courseId, players )

    return res.status (201).json({
        success: true,
        message: `Game created with ID: ${createdGame}`
    })
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
            message: `All your games loaded:`,
            getGames
        })
    };

};

export default { getGameById, getAllGames, createGame, getMyGames };
