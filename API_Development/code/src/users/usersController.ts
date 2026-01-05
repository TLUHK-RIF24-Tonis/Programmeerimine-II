import { NextFunction, Request, Response } from "express";
import userService from "./userService";
import hashService from "../general/hashService";
import CustomError from "../general/CustomError";

const getAllUsers = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const users = await userService.getAllUsers();

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

        if (!user) {
            throw new CustomError(`User with this id: ${id} was not found!`, 403)
        }

        const changeStatus = await userService.changeUserStatus(id);

        if (!changeStatus.active) {
            throw new CustomError(`${changeStatus.username} is not active!`, 403)
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

const createUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { username, email, password } = req.body

        if ( !username || !email || !password ) {
            throw new CustomError(`Details are missing for account creation!`, 400)
        };

        const identifyUser = await userService.getUserByIdentifier( email || username);

        if ( identifyUser ) {
            throw new CustomError(`User with this email or username already exist!`, 400)
        };

        const hashedPassword = hashService.hash(password);

        const createdUser = await userService.createUser(username, email, hashedPassword);

        return res.status(201).json({
            success: true,
            message: `User created with id: ${createdUser.insertId}`,
    });
    } catch ( error ) {
        if ((error as any).code === 'ER_DUP_ENTRY') {
            return next(new CustomError("Email or username already in use", 400));
        }
    
    return next(error);
    }
};
    

const deleteUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number( req.params.id );

        const deleted = await userService.deleteUser( id );

        if ( !deleted ) {
            throw new CustomError(`User with ID: ${id} not found!`, 404);
        }

        return res.status(204).send();
    } catch ( error ) {
        return next(error);
    }
};

const getCurrentUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const userId = res.locals.user.id

        const currentUser = await userService.getUserById(userId);

        if ( !currentUser ) {
            throw new CustomError(`User with ID: ${userId} does not exist!`, 404);
        }

        return res.status(200).json({
            success: true,
            message: `User details`,
            currentUser
        });
    } catch ( error ) {
        return next(error);
    }
};

const updateUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const id = Number(req.params.id);
        const { email, username, password, role } = req.body

        if ( email === undefined && username === undefined &&
            password === undefined && role === undefined ) {
            throw new CustomError(`Missing input: email, username, password or role`, 400);
            }
        
        const updated = await userService.updateUser( id, { email, username, password })

        if ( !updated ) {
            throw new CustomError(`User(${id}) does not exist!`, 404);
        }

        return res.status(200).json({
            success: true,
            message: `User updated`,
            user: updated
        });
    } catch ( error ) {
        return next(error);
    }
};

const updateSelf = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const userId = res.locals.user.id;
        const { email, username, password } = req.body;

        if(
            email === undefined &&
            username === undefined &&
            password === undefined
        ) {
            throw new CustomError(`Provide at least one field to update`, 400);
        }

        const updated = await userService.updateUser(userId, { email, username, password });

        if ( !updated ) {
            throw new CustomError(`User(${userId}) does not exist`, 404);
        }

        return res.status(200).json({
            success: true,
            message: `Profile updated!`,
            user: updated
        });
    } catch ( error ) {
        return next(error);
    }
};

export default { getUserById, userStatus, createUser, getAllUsers, deleteUser, getCurrentUser, updateUser, updateSelf };
