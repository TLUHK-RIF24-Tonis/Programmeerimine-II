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

    if (!payload || typeof payload !== "object") {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    if (!("id" in payload)) {
        return res.status(401).json({
            success: false,
            message: "Invalid token: user ID missing"
        });
    }

    res.locals.user = payload;
    console.log(payload)
    return next();
};

export default isLoggedIn;