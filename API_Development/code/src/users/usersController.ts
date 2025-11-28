import { Request, Response } from "express";
import userService from "./userService";
import hashService from "../general/hashService";

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

    if (!user) {
    return res.status(400).json({
        success: false,
        message: `User with this id: ${id} was not found!`
    });
    }

    const changeStatus = await userService.changeUserStatus(id);

    if (!changeStatus.active) {
    return res.status(400).json({
        success: false,
        message: `${changeStatus.username} is not active!`
    });
    } else { 
    return res.status(200).json({
        success: true,
        message: `${changeStatus.username} is active `
    });
    }
};

const createUser = async ( req: Request, res: Response ) => {
    const { username, email, password } = req.body

    if ( !username || !email || !password ) {
        return res.status(400).json({
            success: false,
            message: `Details are missing for account creation!`
        });
    };

    const identifyUser = await userService.getUserByIdentifier( email || username);

    if ((identifyUser)) {
        return res.status(400).json({
            success: false,
            message: 'User already exist!',
        });
    };

    const hashedPassword = hashService.hash(password);

    try {
    const createdUser = await userService.createUser(username, email, hashedPassword);
    return res.status(201).json({
        success: true,
        message: `User created with id: ${createdUser.insertId}`,
    })} catch ( err: any) {
        if ( err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: `Username or email already taken`
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Database error:', err
            });
        }
    };
};

export default { getUserById, userStatus, createUser, getAllUsers };
