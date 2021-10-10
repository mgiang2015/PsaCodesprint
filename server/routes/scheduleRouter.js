import express from 'express';
import {
    getAllSchedules,
    getCFSAdminSchedules,
    getOperatorSchedules,
    getTruckSchedules
} from '../controllers/scheduleController';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

//Declare routes and configure middleware
const scheduleRouter = express.Router();
scheduleRouter.use(express.json());

scheduleRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getAllSchedules));

scheduleRouter
    .route('/cfsAdmin/:cfsAdminId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getCFSAdminSchedules));

scheduleRouter
    .route('/operator/:operatorId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getOperatorSchedules));

scheduleRouter
    .route('/truck/:truckId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getTruckSchedules));

export default scheduleRouter;
