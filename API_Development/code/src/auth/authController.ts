import { Request, Response, NextFunction } from "express";
import userService from "../users/userService";
import hashService from "../general/hashService";
import jwtService from "../general/jwtService";
import CustomError from "../general/CustomError";

const login = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { email, password, username } = req.body;
        if ( !( email || username ) || !password ) {
            throw new CustomError(`Email / username or password are mandatory to login!`, 400)
        }

        const identifier = email || username
        const user = await userService.getUserByIdentifier(identifier)

        if ( !user ) {
            throw new CustomError(`User not found!`, 404);
        }

        const match = hashService.compare( password, user.password );
        if ( !match ) {
            throw new CustomError(`login unsuccessful!`, 400);
        }

        const token = jwtService.createToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            token
        });
    } catch ( error ) {
        return next(error);
    }
};

export default { login };
