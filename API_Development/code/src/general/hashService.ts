import bcrypt from 'bcrypt';
import config from '../config';

const saltRounds = config.saltRounds;

const hash = (password: string): string => {
    const hashed = bcrypt.hashSync(password, saltRounds);
    return hashed;
};

const compare = ( password: string, hash: string ): boolean => {
    const match = bcrypt.compareSync( password, hash );
    return match;
};

export default { hash, compare };
