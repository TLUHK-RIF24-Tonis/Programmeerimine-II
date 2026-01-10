import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ?? 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    test: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_TEST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ?? 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    port: process.env.PORT || 3000,
    saltRounds: process.env.SALT_ROUNDS,
};

export default config;
