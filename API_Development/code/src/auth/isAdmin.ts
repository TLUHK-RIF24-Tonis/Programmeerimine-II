import { Request, Response, NextFunction } from "express";
import CustomError from "../general/CustomError";

const isAdmin = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        if ( res.locals.user.role !== 'admin' ) {
        throw new CustomError(`You need to be admin to access this resource`, 403)
        }
        return next();
    } catch ( error ) {
        return next(error)
    }
};

export default isAdmin;
