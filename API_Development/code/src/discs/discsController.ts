import { Request, Response, NextFunction } from "express";
import discsService from "./discsService";
import userService from "../users/userService";
import CustomError from "../general/CustomError";

const getAllDiscs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const discs = await discsService.getAllDiscs();

        if ( discs.length === 0 ) {
            return res.status(200).json({
                success: true,
                message: `There are no discs!`,
                discs: []
            });
        }

        return res.status(200).json ({
            success: true,
            message: `All discs loaded!`,
            discs,
        });
    } catch ( error ) {
        return next(error);
}};

const getDiscById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const foundDisc = await discsService.getDiscById(id);
        
    if (foundDisc) {   
        return res.status(200).json ({
        success: true,
        message: `Disc Found!`,
        foundDisc,
    });
    } else {
        return res.status(404).json ({
            success: false,
            message: `Disc not found!`
        });
    }} catch (error) {
        return next(error);
    }
};

const getUserDiscs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const userDiscs = await discsService.getUserDiscs(id);

        if (!userDiscs) {
            return res.status(200).json ({
                success: true,
                message: `This user with ID: ${id} does not own any discs!`,
                Discs: []
            });
        } else {
            return res.status(200).json ({
                success: true,
                message: 'All discs loaded',
                userDiscs
            });
        }
    } catch ( error ) {
        return next(error);
    }
};

const getMyDiscs = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = Number(res.locals.user.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            throw new CustomError("Invalid user id in token", 401);
        }

        const userDiscs = await discsService.getUserDiscs(userId);

        return res.status(200).json ({
            success: true,
            message: 'All discs loaded',
            userDiscs
        });
    } catch ( error ) {
        return next(error);
    }
};

const userHaveDisc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, discId } = req.body

        if (
            typeof userId !== 'number' || typeof discId !== 'number' ||
            userId <= 0 || discId <= 0 
        ) {
            throw new CustomError(`Invalid input for: user ID or disc ID, please validate that ID is a number!`, 400);
        }

        const isDisc = await discsService.getDiscById(discId);
        const isUser = await userService.getUserById(userId);

        if (!isDisc) {
            throw new CustomError(`This disc with id: ${discId} does not exist!`, 404);
        }

        if (!isUser) {
            throw new CustomError(`This user with id: ${userId} does not exist`, 404);
        }

        const hasDisc = await discsService.userOwnDisc(userId, discId)

        if (!hasDisc) {
            throw new CustomError(`User id: ${userId} does not own this disc.`, 404);
        }
        return res.status(200).json ({
            success: true,
            message: `User id: ${userId} has this disc.`
        }) 
    } catch ( error ) {
        return next(error);
    }
};

const createDisc = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
            const { brand, model, type, speed, glide, turn, fade } = req.body

        if ( 
            (brand === undefined || brand === null || brand === '') ||
           (model === undefined || model === null || model === '') ||
            (type === undefined || type === null || type === '')
        ) {
            throw new CustomError(`Please insert disc brand, model or type!`, 400);
        }

        if (
            (speed === undefined || speed === null || speed === '') ||
            (glide === undefined || glide === null || glide === '') ||
            (turn === undefined || turn === null || turn === '') ||
            (fade === undefined || fade === null || fade === '')
        ) {
            throw new CustomError(`Please insert all flight numbers ( speed, glide, turn, fade ) before adding disc!`, 400);
        }

        const result = await discsService.createDisc(
            brand, model, type, speed, glide, turn, fade
        );

        return res.status(201).json ({
            success: true,
            message: 'Disc created!',
            discId: result.discId,
            brand,
            model,
            type,
            speed,
            glide,
            turn,
            fade
        });
    } catch ( error ) {
        return next(error);
    }
};

const deleteDisc = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const discId = Number( req.params.id );

        if ( Number.isNaN(discId) ) {
            throw new CustomError('Invalid disc ID', 400);
        } 

        const disc = await discsService.getDiscById(discId);

        if ( !disc ) {
            throw new CustomError(`Disc with ID: ${discId} not found`, 404);
        }

        const deleted = await discsService.deleteDisc(discId)

        if ( deleted === false ) {
            throw new CustomError(`Disc with id: ${discId} already deleted`, 400);
        }

        return res.sendStatus(204);
    } catch ( error ) {
        return next(error);
    }
};

const updateDisc = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number(req.params.id);
        const { brand, model, disc_type, speed, glide, turn, fade } = req.body;

        if (
            brand === undefined &&
            model === undefined &&
            disc_type === undefined &&
            speed === undefined &&
            glide === undefined &&
            turn === undefined &&
            fade === undefined
        ) {
            throw new CustomError(`At least one field must be provided!`, 400);
        }

        const updates: Partial<{
            brand: string;
            model: string;
            disc_type: string;
            speed: number;
            glide: number;
            turn: number;
            fade: number;
        }> = {};

        if ( brand !== undefined ) updates.brand = brand;
        if ( model !== undefined ) updates.model = model;
        if ( disc_type !== undefined ) updates.disc_type = disc_type;
        if ( speed !== undefined ) {
        const parsedSpeed = Number(speed);
            if (Number.isNaN(parsedSpeed)) {
                throw new CustomError(`Speed must be a number`, 400);
            }
            updates.speed = parsedSpeed;
        }
        if ( glide !== undefined ) {
        const parsedGlide = Number(glide);
        if (Number.isNaN(parsedGlide)) {
                throw new CustomError(`Glide must be a number`, 400);
            }
            updates.glide = parsedGlide;
        }
        if ( turn !== undefined ) {
            const parsedTurn = Number(turn);
            if (Number.isNaN(parsedTurn)) {
                throw new CustomError(`Turn must be a number`, 400);
            }
            updates.turn = parsedTurn;
        }
        if ( fade !== undefined ) {
            const parsedFade = Number(fade);
            if (Number.isNaN(parsedFade)) {
                throw new CustomError(`Fade must be a number`, 400);
            }
            updates.fade = parsedFade;
        }

        const update = await discsService.updateDisc( id, updates);

        if ( !update ) {
            throw new CustomError(`Disc with ID: ${id} not found!`, 404);
        }

        return res.status(200).json({
            success: true,
            message: `Disc updated`,
            disc: update
        });
    } catch ( error ) {
        return next(error);
    }
};

const addMyDisc = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const userId = Number(res.locals.user.id);
        const discId = Number(req.params.id);

        if ( !Number.isInteger(userId) || userId <= 0 ) {
            throw new CustomError(`Invalid user in token!`, 401);
        }

        if ( !Number.isInteger(discId) || discId <= 0 ) {
            throw new CustomError(`Invalid disc id!`, 404);
        }

        const disc = await discsService.getDiscById(discId);

        if (!disc) {
            throw new CustomError(`Disc with id ${discId} not found`, 404);
        }

        const user = await userService.getUserById(userId);

        if (!user) {
            throw new CustomError(`User with id ${userId} not found`, 404);
        }

        await discsService.addMyDisc( userId, discId );

        return res.status(200).json({
            success: true,
            message: `Disc added to your collection!`,
        });

    } catch ( error ) {
        return next(error);
    }
};

export default { getAllDiscs, getDiscById, getUserDiscs, userHaveDisc, createDisc, deleteDisc, getMyDiscs, updateDisc, addMyDisc };
