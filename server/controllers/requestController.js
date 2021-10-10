import express from 'express';
import mongoose from 'mongoose';

import { Request } from '../models/request';
import { CFSAdmin } from '../models/cfsAdmin';
import { Operator } from '../models/operator';
import { Schedule } from '../models/schedule';
import { createTrucks } from '../ye/algo';
import { Order } from '../ye/teu';
import { Truck } from '../ye/scheduling';

const { Types } = mongoose;

export async function getAllRequests(req, res) {
    try {
        Request.find({})
            // .populate('origin destination operator')
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

        // Call the algo
        const requests = await Request.find({}).populate('origin destination');
        console.log(requests);
        const orders = [];

        for (let i = 0; i < requests.length; i++) {
            console.log(requests[i]);
            orders.push(
                new Order(
                    requests[i].origin.customId,
                    requests[i].destination.customId,
                    requests[i].load,
                    requests[i]._id
                )
            );
        }

        // const orders = requests.map((requ) => {
        //     console.log(requ);
        //     return new Order(
        //         // requ.origin.customId,
        //         requ.destination.customId,
        //         requ.load,
        //         requ._id
        //     );
        // });

        const newSchedules = createTrucks(orders);

        const padded = newSchedules.map(async (sch) => {
            const truck = await Truck.find({ licensePlate: sch.assignedTruck });
            sch.assignedTruck = truck._id;
        });

        // const newSchedules = []; // replace with algo result

        // If algo no error, delete the current schedule for the date and cfsAdmin
        // await Schedule.deleteMany({
        //     cfsAdmin: request.cfsAdmin,
        //     deliveredBy: { $gte: newDate(request.endTime) }
        // });

        await Schedule.deleteMany({});

        // Insert new schedules into db
        await Schedule.insertMany(padded);

        // Update CFS Admin and operator with request
        await CFSAdmin.findByIdAndUpdate(req.body.cfsAdmin, {
            $addToSet: { requests: newRequest._id }
        });

        await Operator.findByIdAndUpdate(req.body.operator, {
            $addToSet: { requests: newRequest._id }
        });

        // Else if algo error, remove newRequest
        // await Request.findByIdAndDelete(request._id);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(request);
    } catch (err) {
        console.log(err);
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
        await Operator.findByIdAndUpdate(request.operator, {
            $pull: {
                requests: request._id
            }
        });

        await CFSAdmin.findByIdAndUpdate(request.cfsAdmin, {
            $pull: {
                requests: request._id
            }
        });

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

// export async function deleteAllRequests(req, res) {
//     try {
//         const resp = await Request.deleteMany({});

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     } catch (err) {
//         res.statusCode = 500;
//         res.send(err);
//     }
// }
