import mysql from 'mysql2/promise';

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: '50gr_turizmas',
};

export let connection = null;

try {
    connection = await mysql.createConnection(dbOptions);
} catch (error) {
    console.log('Nepavyko prisijungti prie DB programos... gal pamirsai isijungti XAMMP?');
}

setInterval(async () => {
    if (connection?.connection?._fatalError !== null) {
        try {
            connection = await mysql.createConnection(dbOptions);
        } catch (error) {
            console.log('Nepavyko prisijungti prie DB programos... gal pamirsai isijungti XAMMP?');
        }
    } else {
        // console.log('conn: ok');
    }
}, 5000);
