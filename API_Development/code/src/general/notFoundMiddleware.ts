import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

const notFoundMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    return next(new CustomError(`No route found!`, 404));
};

export default notFoundMiddleware;
