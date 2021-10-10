// Import middlewares
import express from 'express';
import http from 'http';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import {
    localAdminStrategy,
    localOperatorStrategy
} from './utils/config/passport';

// Import routers
import truckRouter from './routes/truckRouter';
import warehouseRouter from './routes/warehouseRouter';
import cfsAdminRouter from './routes/cfsAdminRouter';
import requestRouter from './routes/requestRouter';
import operatorRouter from './routes/operatorRouter';
import scheduleRouter from './routes/scheduleRouter';

import passport from 'passport';
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Import routes

const app = express();

// Morgan middleware
app.use(logger('dev'));

// Parse request body
app.use(express.json({ limit: '5mb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '5mb',
        parameterLimit: 1000000
    })
);

//Set mongodb url and port from .env
dotenv.config();
const url = process.env.MONGO_URI;
console.log(url);

// Passport middleware
app.use(passport.initialize());

// Passport config
localAdminStrategy;
localOperatorStrategy;

//Set port
const port = process.env.PORT || 5000;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Declare routes
app.use('/api/trucks', truckRouter);
app.use('/api/warehouses', warehouseRouter);
app.use('/api/cfsAdmins', cfsAdminRouter);
app.use('/api/operators', operatorRouter);
app.use('/api/requests', requestRouter);
app.use('/api/schedules', scheduleRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// // Connect mongoose to server
if (process.env.IS_DEPLOYMENT == 'true') {
    mongoose
        .connect(url, {
            authSource: process.env.MONGO_AUTH_SOURCE,
            user: process.env.MONGO_ADMIN_NAME,
            pass: process.env.MONGO_ADMIN_PASSWORD
        })
        .then(() => {
            console.log('Connected correctly to server');
        })
        .catch((err) => console.log(err));
} else {
    mongoose
        .connect(url)
        .then(() => {
            console.log('Connected correctly to server');
        })
        .catch((err) => console.log(err));
}

// console.log(url);
const server = http.createServer(app);

//Start the server
server.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});

//Export app for testing
// module.exports = server;
export default app;
