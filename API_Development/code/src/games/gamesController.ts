import { Request, Response } from "express";
import gamesService from "./gamesService";

const getAllGames = ( req: Request, res: Response ) => {
    const games = gamesService.getAllGames()

    return res.status(200).json ({
        success: true,
        message: `All your games loaded!`,
        games,
    });
};

const getGameById = ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const game = gamesService.getGameById(id);

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

export default { getGameById, getAllGames };
