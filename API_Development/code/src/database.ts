import mysql from 'mysql2';
import config from './config';

let dbConfig;

if (process.env.NODE_ENV === 'test') {
  dbConfig = config.test;
} else {
  dbConfig = config.db;
};

const pool = mysql.createPool(dbConfig).promise();

export default pool;
