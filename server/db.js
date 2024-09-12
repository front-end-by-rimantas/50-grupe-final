import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '50gr_turizmas',
});