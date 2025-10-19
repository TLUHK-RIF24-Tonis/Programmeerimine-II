import { Request, Response } from "express";
import userService from "./userService";

const getAllUsers = ( req: Request, res: Response ) => {
    const users = userService.getAllUsers();
    return res.status(200).json({
        success: true,
        users,
        message: 'List of users'
    })
};

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

const createUser = ( req: Request, res: Response ) => {
    const { username, email, password } = req.body
    if ( !username || !email || !password ) {
        return res.status(400).json({
            success: false,
            message: 'login details are missing!',
        });
    };

    const newEmail = userService.findUserByEmail(email)
    const newUsername = userService.findUserByUsername(username)

    if (newEmail || newUsername) {
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
