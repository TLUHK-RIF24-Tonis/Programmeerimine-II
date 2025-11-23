import { Request, Response } from "express";
import discsService from "./discsService";
import userService from "../users/userService";

const getAllDiscs = async (req: Request, res: Response) => {
    const discs = await discsService.getAllDiscs();

    if ( !discs ) {
        return res.status(204).json({
            success: true,
            message: `There are no discs!`,
            discs: []
        })
    }

    return res.status(200).json ({
        success: true,
        message: `All discs loaded!`,
        discs,
    });
};

const getDiscById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const foundDisc = await discsService.getDiscById(id);

    if (foundDisc) {   
        return res.status(200).json ({
        success: true,
        message: `Disc Found!`,
        foundDisc,
    })};

    if(!foundDisc) {
        return res.status (404).json ({
            success: false,
            message: `Disc not found!`
        });
    };
};

const getUserDiscs = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const userDiscs = await discsService.getUserDiscs(id);

    if (!userDiscs) {
        return res.status(200).json ({
            success: true,
            message: 'You dont have any discs!',
            Discs: []
        });
    } else {
        return res.status(200).json ({
            success: true,
            message: 'All discs loaded',
            userDiscs
        });
    };
};

const userHaveDisc = (req: Request, res: Response) => {
    const { userId, discId } = req.body

    const isDisc = discsService.getDiscById(discId);
    const isUser = userService.getUserById(userId);

    if (!isDisc || !isUser) {
        return res.status(400).json ({
            success: false,
            message: 'Missing user or disc, please check if both exists!'
        })
    }

    const hasDisc = discsService.userOwnDisc(userId, discId)

    if (!hasDisc) {
        return res.status(404).json ({
            success: false,
            message: `User id: ${userId} does not own this disc.`
        })
    }
    return res.status(200).json ({
        success: true,
        message: `User id: ${userId} has this disc.`
    }) 
}

const createDisc = async ( req: Request, res: Response ) => {
    const { brand, model, type, speed, glide, turn, fade } = req.body

    if ( !brand || !model || !type ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert disc brand, model or type!'
        })
    }

    if ( speed == null || glide == null || turn == null || fade == null ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert all flight numbers ( speed, glide, turn, fade ) before adding disc!'
        })
    }

    const result = await discsService.createDisc(
        brand, model, type, speed, glide, turn, fade
    );
    
    if ( !result.success ) {
        return res.status(409).json ({
            success: false,
            message: result.message
        })
    } else {
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
    };
};

export default { getAllDiscs, getDiscById, getUserDiscs, userHaveDisc, createDisc };
