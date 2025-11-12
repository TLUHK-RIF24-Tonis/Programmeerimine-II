import mysql from 'mysql2';
import config from './config';

const pool = mysql
.createPool({
    host: config.db.host,
    port: (config.db.port ?? 3306),
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
})
.promise();

export default pool;
