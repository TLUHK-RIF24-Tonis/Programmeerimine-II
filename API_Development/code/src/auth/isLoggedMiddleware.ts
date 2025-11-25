import { Request, Response, NextFunction } from "express";
import jwtService from "../general/jwtService";
import CustomError from "../general/CustomError";

const isLoggedIn = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const token = req.headers.authorization?.split( ' ' )[1];

        if ( !token ) {
            throw new CustomError(`You need to provide token!`, 401);
        }

        const payload = jwtService.verify(token);

        if ( !payload ) {
            throw new CustomError(`You are not logged in!`, 401);
        }

        if (!payload || typeof payload !== "object") {
            throw new CustomError(`Invalid token`, 401);
        }

        if (!("id" in payload)) {
            throw new CustomError(`Invalid token: user ID missing`, 401);
        }

        res.locals.user = payload;
        return next();
        
    } catch ( error ) {
        return next(error);
    }
};

export default isLoggedIn;
