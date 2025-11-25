import { NextFunction, Request, Response } from "express";
import userService from "./userService";
import { ResultSetHeader } from "mysql2";
import hashService from "../general/hashService";
import CustomError from "../general/CustomError";

const getAllUsers = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const users = await userService.getAllUsers();

        if ( !users ) {
            throw new CustomError(`There are no users!`, 400)
        };

        return res.status(200).json({
            success: true,
            users,
            message: 'List of users'
        });
    } catch ( error ) {
        return next(error);
    }
};

const getUserById = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number(req.params.id);

        const user = await userService.getUserById(id);

        if (!user) {
             throw new CustomError(`User with ID(${id}) does not exist`, 404)
        };

        return res.status(200).json({
            success: true,
            message: 'User found!',
            user: user
        });
    } catch ( error ) {
        return next(error);
    }
};

const userStatus = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number(req.params.id);

        const user = await userService.getUserById(id);
        const changeStatus = await userService.changeUserStatus(id);

        if (!changeStatus.active) {
            throw new CustomError(`${changeStatus.username} is not active!`, 200)
        }
        if (!user) {
            throw new CustomError(`User with this id: ${id} was not found!`, 404)
        } else { 
        return res.status(200).json({
            success: true,
            message: `${changeStatus.username} is active `
        })
        }
    } catch ( error ) {
        return next(error);
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

const deleteUser = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );

    const deleted = await userService.deleteUser( id );

    if ( !deleted ) {
        return res.status(404).json({
            success: false,
            message: `User with ID: ${id} not found!`
        });
    }

    return res.status(204).send();
};

const getCurrentUser = async ( req: Request, res: Response ) => {

    const userId = res.locals.user.id

    const currentUser = await userService.getUserById(userId);

    if ( !currentUser ) {
        return res.status(404).json({
            success: false,
            message: `User with ID: ${userId} does not exist!`
        });
    }

    return res.status(200).json({
        success: false,
        message: `User details`,
        currentUser
    });
};

const updateUser = async ( req: Request, res: Response ) => {

    const id = Number(req.params.id);
    const { email, username, password, role } = req.body

    if ( email === undefined && username === undefined &&
        password === undefined && role === undefined ) {
            return res.status(400).json({
                success: false,
                message: `Missing input: email, username or password`
            });
        }
    
    const updated = await userService.updateUser( id, { email, username, password })

    if ( !updated ) {
        return res.status(404).json({
            success: false,
            message: `User(${id}) does not exist!`
        });
    }

    return res.status(200).json({
        success: true,
        message: `User updated`,
        User: updated
    });
}

const updateSelf = async ( req: Request, res: Response ) => {

    const userId = res.locals.user.id;
    const { email, username, password } = req.body;

    if(
        email === undefined &&
        username === undefined &&
        password === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: `Provide at least one field to update`
        });
    }

    const updated = await userService.updateUser(userId, { email, username, password });

    if ( !updated ) {
        return res.status(404).json({
            success: false,
            message: `User(${userId}) does not exist`
        });
    }

    return res.status(200).json({
        success: true,
        message: `Profile updated!`,
        user: updated
    });
};

export default { getUserById, userStatus, createUser, getAllUsers, deleteUser, getCurrentUser, updateUser, updateSelf };
