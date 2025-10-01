import { Request, Response } from "express";
import discsService from "./discsService";
import userService from "../users/userService";

const getAllDiscs = (req: Request, res: Response) => {
    const discs = discsService.getAllDiscs();

    return res.status(200).json ({
        success: true,
        message: `All player discs loaded!`,
        discs,
    });
};

const getDiscById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const disc = discsService.getDiscById(id);

    if (disc) {   
        return res.status(200).json ({
        success: true,
        message: `Disc Found!`,
        disc,
    })};

    if(!disc) {
        return res.status (404).json ({
            success: false,
            message: `Disc not found!`
        });
    };
};

const getUserDiscs = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const userDiscs = discsService.getUserDiscs(id);

    if (userDiscs.length === 0) {
        return res.status(404).json ({
            success: false,
            message: 'You dont have any discs!'
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
    const isUser = userService.getUserById(userId)

    if ( isDisc && isUser ) {
        return res.status(200).json ({
            success: true,
            message: `Disc: ${discId} belongs to ${userId}`,
            isDisc
        });
    }
    if ( isDisc && !isUser)
        return res.status(404).json({
            success: false,
            message: 'User does not have this disc!'
        })
    if ( !isDisc && isUser )
        return res.status(404).json ({
            success: false,
            message: 'Disc does not exist!'
        })
};

const createDisc = ( req: Request, res: Response ) => {
    const { brand, model, type, speed, glide, turn, fade } = req.body

    const disc = discsService.createDisc( brand, model, type, speed, glide,turn ,fade )
    if ( !brand || !model || !type ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert disc brand, model or type!'
        })
    }

    if ( speed === "" || glide === "" || turn === "" || fade === "" ) {
        return res.status(400).json ({
            success: false,
            message: 'Please insert flight numbers before adding disc!'
        })
    }
    if ( !disc ) {
        return res.status(404).json ({
            success: false,
            message: 'Disc already exist!'
        })
    } else {
        return res.status(201).json ({
            success: true,
            message: 'Disc added!',
            brand,
            model,
            type,
            speed,
            glide,
            turn,
            fade
        })
    }
};

export default { getAllDiscs, getDiscById, getUserDiscs, userHaveDisc, createDisc };
