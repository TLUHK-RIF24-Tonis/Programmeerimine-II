import { Request, Response } from "express";

const login = ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        return res.status(400).json({
            success: false,
            message: 'Email or password is missing!'
        })
    }
};

export default { login };
