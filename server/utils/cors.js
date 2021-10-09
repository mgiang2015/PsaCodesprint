// import express, { Request } from 'express';
import cors from 'cors';

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
export const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
