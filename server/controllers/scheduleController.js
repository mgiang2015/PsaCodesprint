import express from 'express';
import isEmpty from 'is-empty';
import { Schedule } from '../models/schedule';

export async function getAllSchedules(req, res) {
    try {
        Schedule.find({})
            .populate('assignedTruck origin destination operator cfsAdmin')
            .then((schedules) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(schedules);
            });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getCFSAdminSchedules(req, res, next) {
    try {
        if (req.body.startDate) {
            const startDate = new Date(req.body.startDate);

            let endDate;

            // If no endDate then set endDate to the end of the day
            if (!req.body.endDate) {
                endDate = new Date(req.body.startDate);
            } else {
                endDate = new Date(req.body.endDate);
            }

            endDate.setDate(endDate.getDate() + 1);

            const dateSchedules = await Schedule.find({
                cfsAdmin: req.params.cfsAdminId,
                deliverAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(dateSchedules)) {
                let err = new Error(
                    'No CFSAdmin Schedules found within the specified date or CFSAdmin not found'
                );
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dateSchedules);
        } else {
            const allSchedules = await Schedule.find({
                cfsAdmin: req.params.cfsAdminId
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(allSchedules)) {
                let err = new Error(
                    'No CFSAdmin Schedules found  or CFSAdmin not found'
                );
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(allSchedules);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
        next(err);
    }
}

export async function getOperatorSchedules(req, res, next) {
    try {
        if (req.body.startDate) {
            const startDate = new Date(req.body.startDate);

            let endDate;

            // If no endDate then set endDate to the end of the day
            if (!req.body.endDate) {
                endDate = new Date(req.body.startDate);
            } else {
                endDate = new Date(req.body.endDate);
            }

            endDate.setDate(endDate.getDate() + 1);

            const dateSchedules = await Schedule.find({
                operator: req.params.operatorId,
                deliverAt: { $gte: startDate, $lt: endDate }
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(dateSchedules)) {
                let err = new Error(
                    'No Operator Schedules found within the specified date'
                );
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dateSchedules);
        } else {
            const allSchedules = await Schedule.find({
                operator: req.params.operatorId
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(allSchedules)) {
                let err = new Error('No Operator Schedules found');
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(allSchedules);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
        next(err);
    }
}

export async function getTruckSchedules(req, res, next) {
    try {
        if (req.body.startDate) {
            const startDate = new Date(req.body.startDate);

            let endDate;

            // If no endDate then set endDate to the end of the day
            if (!req.body.endDate) {
                endDate = new Date(req.body.startDate);
            } else {
                endDate = new Date(req.body.endDate);
            }

            endDate.setDate(endDate.getDate() + 1);

            const dateSchedules = await Schedule.find({
                assignedTruck: req.params.truckId,
                deliverAt: { $gte: startDate, $lt: endDate }
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(dateSchedules)) {
                let err = new Error(
                    'No Truck Schedules found within the specified date'
                );
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dateSchedules);
        } else {
            const allSchedules = await Schedule.find({
                assignedTruck: req.params.truckId
            }).populate('assignedTruck origin destination operator cfsAdmin');

            if (isEmpty(allSchedules)) {
                let err = new Error('No Truck Schedules found');
                res.statusCode = 404;
                return next(err);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(allSchedules);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
        next(err);
    }
}

// export async function postSchedule(req, res) {
//     try {
//         // Creates new Schedule with the updated req.body
//         const newSchedule = new Schedule(req.body);

//         // Save Schedule to DB
//         const schedule = await newSchedule.save();

//         await CFSAdmin.findByIdAndUpdate(req.body.cfsAdmin, {
//             $addToSet: { schedules: newSchedule._id }
//         });

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(schedule);
//     } catch (err) {
//         if (err.errors) {
//             res.statusCode = 400;
//             res.send(err);
//         } else {
//             res.statusCode = 500;
//             res.send(err);
//         }
//     }
// }

// export async function updateSchedule(req, res) {
//     const schedule = await Schedule.findByIdAndUpdate(
//         req.params.scheduleId,
//         {
//             $set: req.body
//         },
//         { new: true }
//     );

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json(schedule);
// }

// export async function deleteSchedule(req, res) {
//     const schedule = await Schedule.findById(req.params.scheduleId);
//     if (schedule != null) {
//         await CFSAdmin.findByIdAndUpdate(schedule.cfsAdmin, {
//             $pull: {
//                 schedules: schedule._id
//             }
//         });

//         const removedSchedule = await Schedule.findByIdAndRemove(
//             req.params.scheduleId
//         );
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(removedSchedule);
//     } else {
//         let err = new Error(
//             'Schedule ' + req.params.scheduleId + ' not found!'
//         );
//         res.statusCode = 404;
//         return next(err);
//     }
// }
