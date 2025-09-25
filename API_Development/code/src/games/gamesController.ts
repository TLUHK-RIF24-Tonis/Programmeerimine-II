import { Request, Response } from "express";
import gamesService from "./gamesService";
import userService from "../users/userService";

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

const createGame = ( req: Request, res: Response ) => {
    const { datePlayed, score, course } = req.body

    const userId = Number(req.body.userId);
    if ( !userId ) {
        return res.status(400).json ({
            success: false,
            message: 'User ID is missing from creation request!'
        });
    };

    const checkUser = userService.getUserById(userId);
    if ( !checkUser ) {
        return res.status(401).json ({
            success: false,
            message: 'User is not authorized or does not exist!'
        })
    }

    const foundCourse = gamesService.courses.find(c => c.name === course);

    if (!foundCourse) {
        return res.status(404).json ({
            success: false,
            message: `${course} does not exist, You can add course under course section!`
        });
    };

    const courseId = foundCourse.id;

    try {
        const newGameId = gamesService.createGame(new Date(datePlayed), score, courseId, userId)

        return res.status(201).json ({
            success: true,
            message: 'Game successfully created!',
            gameId: newGameId
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create game due to server error!',
            error: error
        });
    };
};

export default { getGameById, getAllGames, createGame };
