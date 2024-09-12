import express from 'express';
import { locationsAPIrouter } from './locations/locations.js';

export const apiRouter = express.Router();

apiRouter.use('/locations', locationsAPIrouter);

apiRouter.all('/', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Issirink konkretu API endpointa',
    });
});