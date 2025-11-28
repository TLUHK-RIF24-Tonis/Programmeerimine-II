import mysql from 'mysql2';
import config from './config';

const pool = mysql
.createPool({
    host: config.db.host,
    port: (config.db.port ?? 3306),
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: false, // kui see on true soodustab sql injectioni.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
.promise();

export default pool;
