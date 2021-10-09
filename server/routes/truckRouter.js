import express from 'express';
import {
    getAllTrucks,
    postTruck,
    getTruck,
    updateTruck,
    deleteTruck
    // deleteAllTrucks
} from '../controllers/truckController';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

//Declare routes and configure middleware
const truckRouter = express.Router();
truckRouter.use(express.json());

truckRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getAllTrucks))
    .post(cors(corsOptionsDelegate), asyncHandler(postTruck));
// .delete(cors(corsOptionsDelegate), asyncHandler(deleteAllTrucks));

truckRouter
    .route('/:truckId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getTruck))
    .put(cors(corsOptionsDelegate), asyncHandler(updateTruck))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteTruck));

export default truckRouter;
