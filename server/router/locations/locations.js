import { connection } from '../../db.js';
import express from 'express'

export const locationsAPIrouter = express.Router();

locationsAPIrouter.get('/', getLocations);

async function getLocations(req, res) {
    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);

    return res.json({
        status: 'success',
        data: dataFromServer[0],
    });
}