import express from 'express';
import { connection } from '../../db.js';
import { env } from '../../env.js';

export const logoutAPIrouter = express.Router();

logoutAPIrouter.get('/', getLogout);

logoutAPIrouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas /api/logout nepalaikomas',
    });
});

async function getLogout(req, res) {
    if (!req.cookies.loginToken) {
        return res.json({
            status: 'error',
            msg: 'Atjungtu/neegzistuojanciu (sesiju) neatjunginejame',
        });
    }

    try {
        const sql = 'DELETE FROM tokens WHERE token = ?;';
        const result = await connection.execute(sql, [req.cookies.loginToken]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti atsijungimo proceso, pabandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + req.cookies.loginToken,
        'domain=localhost',
        'path=/',
        'max-age=-1',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Buvo sekmingai atsijungta',
        });
}