import { Request, Response, NextFunction } from "express";
import jwtService from "../general/jwtService";

const isLoggedIn = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers.authorization?.split( ' ' )[1];

    if ( !token ) {
        return res.status(401).json({
            success: false,
            message: 'You need to provide token!'
        });
    }

    const payload = jwtService.verify(token);

    if ( !payload ) {
        return res.status(401).json({
            success: false,
            message: 'You are not logged in!'
        });
    }
    res.locals.user = payload;
    console.log(payload);
    return next();
};

export default isLoggedIn;
