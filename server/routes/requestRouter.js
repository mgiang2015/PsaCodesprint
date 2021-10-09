const express = require('express');
// const cors = require('cors');
// const corsOptionsDelegate = require('../../node_modules/cors');

const requestRouter = express.Router();
requestRouter.use(express.json());

const requestController = require('../controllers/requestController');

requestRouter
    .route('/')
    .get(authenticate.verifyUser, requestController.getAllRequests)
    .post(authenticate.verifyUser, requestController.postRequest);

requestRouter
    .route('/:requestId')
    .get(authenticate.verifyUser, requestController.getRequest)
    .put(authenticate.verifyUser, requestController.updateRequest)
    .delete(authenticate.verifyUser, requestController.deleteRequest);

module.exports = requestRouter;
