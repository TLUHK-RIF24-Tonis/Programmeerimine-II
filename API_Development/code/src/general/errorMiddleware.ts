import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

const errorMiddleware = (
    error: CustomError, req: Request, res: Response, next: NextFunction) => {
        console.error(`[ERROR] ${error.message}`);
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
