import express from 'express';
import { connection } from '../../db.js';
import { env } from '../../env.js';
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

const tokenLength = 20;

export const loginAPIrouter = express.Router();

loginAPIrouter.get('/', getLogin);
loginAPIrouter.post('/', postLogin);

loginAPIrouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas /api/login nepalaikomas',
    });
});

async function getLogin(req, res) {
    return res.json({
        isLoggedIn: req.user.isLoggedIn,
        role: req.user.role,
        username: req.user.username,
    });
}

async function postLogin(req, res) {
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

    // 1) isitikiname, jog yra tik 1 toks {username, password} variantas (user'is)
    // 2) sugeneruojame RANDOM string
    // 3) ji isirasome i DB (nauja lentele)
    // 4) ji atiduodame i userio narsykle ir irasome i narsykles coockies

    let userData = null;

    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?;';
        const result = await connection.execute(sql, [username, password]);

        if (result[0].length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Kilo problemo su vartotojo paskyra, susisiekite su client-supportu',
            });
        }

        userData = result[0][0];
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    try {
        const sql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?);';
        const result = await connection.execute(sql, [token, userData.id]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + token,
        'domain=localhost',
        'path=/',
        'max-age=' + env.COOKIE_MAX_AGE,
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Buvo sekmingai prisijungta',
            isLoggedIn: true,
            username: userData.username,
            role: userData.role,
        });
}