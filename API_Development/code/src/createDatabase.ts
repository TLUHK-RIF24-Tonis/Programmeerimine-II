import mysql2 from 'mysql2';
import path from 'path';
import fs from 'fs';
import config from './config';

const dbConfig = config.test;

const sqlFilePath = path.join(__dirname, '../sql/test.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8').toString();
const db = mysql2.createConnection(dbConfig).promise();

const statements = sqlContent.split(/;\s*$/m);

async function runQuery(sql: string) {
  try {
    console.log('Running query');
    await db.query(sql);
  } catch (error) {
    console.log('Error', error);
  }
}

try {
  db.beginTransaction();
  for (const statement of statements) {
    if (statement.trim().length > 0) {
      runQuery(statement);
    }
  }
  db.commit();
  console.log('Database created and seeded.');
} catch (error) {
  console.log(error);
  db.rollback();
} finally {
  db.end();
}
