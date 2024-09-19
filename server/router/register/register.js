import { connection } from '../../db.js';
import express from 'express'
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

export const registerAPIrouter = express.Router();

registerAPIrouter.post('/', postRegister);

registerAPIrouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas /api/register nepalaikomas',
    });
});

async function postRegister(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null
    ) {
        return res.json({
            status: 'error',
            msg: 'Pagrindinis duomenu tipas turi buti objektas',
        });
    }

    const requiredFields = ['username', 'password'];

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            data: `Objekte turi buti tik ${requiredFields.length} raktai: ${requiredFields.join(', ')}`,
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            data: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            data: passwordError,
        });
    }

    try {
        const sql = 'SELECT username FROM users WHERE username = ?;';
        const result = await connection.execute(sql, [username]);

        if (result[0].length !== 0) {
            return res.json({
                status: 'error',
                msg: 'Vartotojas su tokiu username jau yra uzregistruotas',
            });
        }

    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti registracijos proceso, pabandykite veliau',
        });
    }


    try {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?);';
        const result = await connection.execute(sql, [username, password]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Uzregistruoti nepavyko, nes toks vartotojas jau yra',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti registracijos proceso, pabandykite veliau',
        });
    }

    return res.json({
        status: 'success',
        msg: 'Registracija buvo sekminga',
    });
}