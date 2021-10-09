import express from 'express';
import {
    getAllOperators,
    putOperator,
    getOperator,
    registerOperator,
    authenticateLogin,
    loginOperator
} from '../controllers/operatorController';
import asyncHandler from 'express-async-handler';

import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

// Declare routes & configure middleware
const operatorRouter = express.Router();
operatorRouter.use(express.json());

operatorRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), asyncHandler(getAllOperators));

operatorRouter
    .route('/profiles/:username')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), getOperator)
    .put(cors(corsOptionsDelegate), asyncHandler(putOperator));

operatorRouter
    .route('/register')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), asyncHandler(registerOperator));

operatorRouter
    .route('/login')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .post(
        cors(corsOptionsDelegate),
        authenticateLogin,
        asyncHandler(loginOperator)
    );

export default operatorRouter;
