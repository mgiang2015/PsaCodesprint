const express = require('express');

const Request = require('../models/request');

const requestController = {
    getAllRequests(req, res) {
        try {
            Request.find({}).then((requests) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(requests);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getRequest(req, res, next) {
        Request.findById(req.params.requestId)
            .then((request) => {
                if (request != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(request);
                } else {
                    let err = new Error(
                        'Request ' + req.params.requestId + ' not found!'
                    );
                    res.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    },

    postRequest(req, res) {
        try {
            // Creates new Request with the updated req.body
            const newRequest = new Requests(req.body);

            // Save Request to DB
            const request = await newRequest.save();

            const populatedRequests = await(Requests).findById(request._id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(populatedRequests);
        } catch (err) {
            if (err.errors) {
                res.statusCode = 400;
                res.send(err);
            } else {
                res.statusCode = 500;
                res.send(err);
            }
        }
    },

    updateRequest(req, res) {
        const request = await Requests.findByIdAndUpdate(
            req.params.requestId,
            {
                $set: req.body
            },
            { new: true }
        );

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(request);
    },

    deleteRequest(req, res) {
        const request = await Requests.findById(req.params.requestId);
        if (request != null) {
            const removedRequest = await Requests.findByIdAndRemove(
                req.params.requestId
            );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(removedRequest);
        } else {
            let err = new Error(
                'Request ' + req.params.requestId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        }
    }
};

module.exports = requestController;
