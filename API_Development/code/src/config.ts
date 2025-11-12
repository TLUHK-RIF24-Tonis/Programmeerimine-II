import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000,
    saltRounds: process.env.SALT_ROUNDS,
};

export default config;
