import express from 'express';
import { Request } from '../models/request';

export async function getAllRequests(req, res) {
    try {
        Request.find({})
            .populate('origin destination operator')
            .then((requests) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(requests);
            });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getRequest(req, res, next) {
    Request.findById(req.params.requestId)
        .populate('origin destination operator')
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
}

export async function postRequest(req, res) {
    try {
        // Creates new Request with the updated req.body
        const newRequest = new Request(req.body);

        // Save Request to DB
        const request = await newRequest.save();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(request);
    } catch (err) {
        if (err.errors) {
            res.statusCode = 400;
            res.send(err);
        } else {
            res.statusCode = 500;
            res.send(err);
        }
    }
}

export async function updateRequest(req, res) {
    const request = await Request.findByIdAndUpdate(
        req.params.requestId,
        {
            $set: req.body
        },
        { new: true }
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(request);
}

export async function deleteRequest(req, res) {
    const request = await Request.findById(req.params.requestId);
    if (request != null) {
        const removedRequest = await Request.findByIdAndRemove(
            req.params.requestId
        );
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(removedRequest);
    } else {
        let err = new Error('Request ' + req.params.requestId + ' not found!');
        res.statusCode = 404;
        return next(err);
    }
}

export async function deleteAllRequests(req, res) {
    try {
        const resp = await Request.deleteMany({});

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
}