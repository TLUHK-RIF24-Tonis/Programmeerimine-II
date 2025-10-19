import { Request, Response, NextFunction } from "express";

const isAdmin = ( req: Request, res: Response, next: NextFunction ) => {
    if ( res.locals.user.role !== 'admin' )
        return res.status(403).json({
            success: false,
            message: 'You need to be admin to access this resource'
    });
    return next();
};

export default isAdmin;
