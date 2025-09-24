import { Request, Response } from "express";
import discsService from "./discsService";

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
        message: `All player discs loaded!`,
        disc,
    })};

    if(!disc) {
        return res.status (404).json ({
            success: false,
            message: `Disc not found!`
        });
    };
};

export default { getAllDiscs, getDiscById };
