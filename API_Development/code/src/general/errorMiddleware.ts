import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

const errorMiddleware = (
    error: CustomError, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        if( error.statusCode ) {
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
