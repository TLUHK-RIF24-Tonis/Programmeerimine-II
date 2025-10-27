import jwt from "jsonwebtoken";
import IUsers from "../users/usersInterface";
import config from "../config";

const createToken = ( payload: Omit<IUsers, 'password' | 'created' | 'active'> ): string => {
    const token = jwt.sign( payload, config.jwtSecret, { expiresIn: '1h' } );
    return token
};

const verify = ( token: string ) => {
    try {
    return jwt.verify( token, config.jwtSecret );
    } catch ( e ) {
        return null;
    }
}

export default { createToken, verify };
