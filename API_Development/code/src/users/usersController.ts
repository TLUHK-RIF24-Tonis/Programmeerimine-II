import { Request, Response } from "express";
import userService from "./userService";

const getAllUsers = async ( req: Request, res: Response ) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
        success: true,
        users,
        message: 'List of users'
    })
};

const getUserById = async ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);

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

const userStatus = async ( req: Request, res: Response ) => {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);
    const changeStatus = await userService.changeUserStatus(id);

    if (!changeStatus.active) {
    return res.status(200).json({
        success: false,
        message: `${changeStatus.username} is not active!`
    });
}
    if (!user) {
    return res.status(400).json({
        success: false,
        message: `User with this id: ${id} was not found!`
    });
}   else { 
    return res.status(200).json({
        success: true,
        message: `${changeStatus.username} is active `
    })
    }
};

const createUser = ( req: Request, res: Response ) => {
    const { username, email, password } = req.body

    const result = userService.createUser(username, email, password);

    if ( !username || !email || !password ) {
        return res.status(400).json({
            success: false,
            message: `login details are missing! ${result}`,
        });
    };

    const checkIdent = userService.getUserByIdent(username, email);

    if (!(!checkIdent)) {
        return res.status(400).json({
            success: false,
            message: 'User already exist!',
        });
    };

    const id = userService.createUser(username, email, password);
    return res.status(201).json({
        success: true,
        message: `User created with id: ${id}`,
    })
};

export default { getUserById, userStatus, createUser, getAllUsers };
