import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";
import errorLogger from "../utilites/errorLogger";

const errorMiddleware = async (
    error: any, req: Request, res: Response, next: NextFunction) => {

        const route = req.originalUrl;
        const method = req.method
        const userId = res.locals.user?.id ?? null;
        const stack = error.stack ?? null;

        try {
            await errorLogger.logErrorToDb( error.message, stack, method, route, userId );
        } catch ( error ) {
            console.error('Failed to write error log to DB', error);
        }

        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({
                success: false,
                message: error.message
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Server error...'
        })
    };

export default errorMiddleware;
