import express from 'express';
import {
    getAllRequests,
    postRequest,
    getRequest,
    updateRequest,
    deleteRequest,
    deleteAllRequests
} from '../controllers/requestController';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

//Declare routes and configure middleware
const requestRouter = express.Router();
requestRouter.use(express.json());

requestRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getAllRequests))
    .post(cors(corsOptionsDelegate), asyncHandler(postRequest))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteAllRequests));

requestRouter
    .route('/:requestId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getRequest))
    .put(cors(corsOptionsDelegate), asyncHandler(updateRequest))
    .delete(cors(corsOptionsDelegate), asyncHandler(deleteRequest));

export default requestRouter;
