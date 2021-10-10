import express from 'express';
import mongoose from 'mongoose';

import { Request } from '../models/request';
import { CFSAdmin } from '../models/cfsAdmin';
import { Operator } from '../models/operator';
import { Schedule } from '../models/schedule';
import { Truck } from '../models/truck';
import { createTrucks } from '../ye/algo';
import { Order } from '../ye/teu';

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
        const requests = await Request.find({});
        console.log(requests);
        // .populate('origin destination');

        const orders = requests.map((requ) => {
            console.log(requ);
            return new Order(
                requ.origin.customId,
                requ.destination.customId,
                requ.load,
                requ._id
            );
        });

        const trucks = createTrucks(orders);

        for (let truck in trucks) {
            const dbTruck = Truck.findOne({ licensePlate: truck.platenumber });

            const scheduleArr = truck.schedule;

            const dbScheduleArr = scheduleArr.map(async (sch) => {
                // let loadCount = sch.route.container.contents.map(
                //     (c) => c.pallets
                // );
                const content = {
                    pickups: sch.pickups,
                    destination: sch.destination,
                    distance: sch.distance,
                    path: sch.path,
                    deliverAt: sch.startTime,
                    deliveryBy: sch.deliveryTime,
                    // load: loadCount,
                    estTotalTime: sch.duration
                };

                const newSchedule = new Schedule(content);
                await newSchedule.save();
            });

            const schIdArr = dbScheduleArr.map((sch) => sch._id);

            dbTruck.availTime = truck.availTime;
            dbTruck.schedule = schIdArr;
            await dbTruck.save();
        }

        const newSchedules = []; // replace with algo result

        // If algo no error, delete the current schedule for the date and cfsAdmin
        // await Schedule.deleteMany({
        //     cfsAdmin: request.cfsAdmin,
        //     deliveredBy: { $gte: newDate(request.endTime) }
        // });

        // Insert new schedules into db
        // await Schedule.insertMany(newSchedules);

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
