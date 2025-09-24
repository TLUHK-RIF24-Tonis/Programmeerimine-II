import { Request, Response } from "express";
import userService from "./userService";

const getUserById = ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const user = userService.getUserById(id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User with this id: ${id} was not found!`
        });
    };

    return res.status(200).json({
        success: true,
        message: 'User found!',
        user: user
    });
};

const userStatus = ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const user = userService.getUserById(id);

    if (!user) {
    return res.status(400).json({
        success: false,
        message: `User with this id: ${id} was not found!`
    });
    };

    if (!user.active) {
        return res.status(208).json({
            success: false,
            message: `User with id: ${id} is already deactivated`,
        });
    };

    const updatedUser = userService.changeUserInfo(id);

    return res.status(200).json({
    success: true,
    message: 'User successfully deactivated!',
    user: updatedUser
    });
};

export default { getUserById, userStatus };
