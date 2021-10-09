import express from 'express';
import {
    getAllCFSAdmins,
    // putCFSAdmin,
    getCFSAdmin,
    registerCFSAdmin,
    authenticateLogin,
    loginCFSAdmin
} from '../controllers/cfsAdminController';

import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

// Declare routes & configure middleware
const cfsAdminRouter = express.Router();
cfsAdminRouter.use(express.json());

cfsAdminRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), getAllCFSAdmins);

cfsAdminRouter
    .route('/profiles/:username')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .get(cors(), getCFSAdmin);
// .put(cors(corsOptionsDelegate), putCFSAdmin);

cfsAdminRouter
    .route('/register')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), registerCFSAdmin);

cfsAdminRouter
    .route('/login')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(204);
    })
    .post(cors(corsOptionsDelegate), authenticateLogin, loginCFSAdmin);

export default cfsAdminRouter;
