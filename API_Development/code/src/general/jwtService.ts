import jwt from "jsonwebtoken";
import IUsers from "../users/usersInterface";
import config from "../config";

const createToken = ( payload: Omit<IUsers, 'password' | 'created' | 'active'> ): string => {
    const token = jwt.sign( payload, config.jwtSecret, { expiresIn: '1h' } );
    return token
};

export default { createToken };
