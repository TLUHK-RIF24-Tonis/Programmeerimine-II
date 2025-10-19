import bcrypt from 'bcrypt';

const saltRounds = 10;

const hash = (password: string): string => {
    const hashed = bcrypt.hashSync(password, saltRounds);
    return hashed;
};

export default { hash };
