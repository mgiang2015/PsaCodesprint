import express from 'express';
import {
    getAllWarehouses,
    postWarehouse,
    getWarehouse,
    updateWarehouse
    // deleteWarehouse
    // deleteAllWarehouses
} from '../controllers/warehouseController';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { corsOptionsDelegate } from '../utils/cors';

//Declare routes and configure middleware
const warehouseRouter = express.Router();
warehouseRouter.use(express.json());

warehouseRouter
    .route('/')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getAllWarehouses))
    .post(cors(corsOptionsDelegate), asyncHandler(postWarehouse));
// .delete(cors(corsOptionsDelegate), asyncHandler(deleteAllWarehouses));

warehouseRouter
    .route('/:warehouseId')
    .options(cors(corsOptionsDelegate), (req, res) => {
        res.sendStatus(200);
    })
    .get(cors(), asyncHandler(getWarehouse))
    .put(cors(corsOptionsDelegate), asyncHandler(updateWarehouse));
// .delete(cors(corsOptionsDelegate), asyncHandler(deleteWarehouse));

export default warehouseRouter;
