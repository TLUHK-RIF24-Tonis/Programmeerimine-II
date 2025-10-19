import { Request, Response, NextFunction } from "express";
import jwtService from "../general/jwtService";

const isLoggedIn = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers.authorization?.split( ' ' )[1];
}

export default isLoggedIn;
