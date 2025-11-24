import { Request, Response } from "express";
import gamesService from "./gamesService";
import userService from "../users/userService";

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

    const createdGame = await gamesService.createGame( courseId, players )

    return res.status (201).json({
        success: true,
        message: `Game created with ID:${createdGame}`
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
    
    return res.status(204).send().json({
        success: true,
        message: `Game with id: ${id} deleted!`
    });
};

export default { getGameById, getAllGames, createGame, getMyGames, deleteGame };
