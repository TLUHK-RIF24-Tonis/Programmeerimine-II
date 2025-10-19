import { Request, Response } from "express";
import userService from "../users/userService";
import hashService from "../general/hashService";

const login = ( req: Request, res: Response ) => {
    const { email, password, username } = req.body;
    if ( !( email || username ) || !password ) {
        return res.status(400).json({
            success: false,
            message: 'Email / username or password are mandatory to login!'
        })
    }
    const user = userService.findUserByEmail(email) || userService.findUserByUsername(username);
    if ( !user ) {
        return res.status(404).json({
            succes: false,
            message: 'User not found!'
        })
    }
    const match = hashService.compare( password, user.password );
    if ( !match ) {
        return res.status(400).json({
            success: false,
            message: 'login unsuccessful!'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Login successful!'
    });
};

export default { login };
