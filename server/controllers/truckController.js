import express from 'express';
import { Truck } from '../models/truck';

export async function getAllTrucks(req, res) {
    try {
        Truck.find({}).then((trucks) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(trucks);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getTruck(req, res, next) {
    Truck.findById(req.params.truckId)
        .then((truck) => {
            if (truck != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(truck);
            } else {
                let err = new Error(
                    'Truck ' + req.params.truckId + ' not found!'
                );
                res.statusCode = 404;
                return next(err);
            }
        })
        .catch((err) => next(err));
}

export async function postTruck(req, res) {
    try {
        // Creates new Truck with the updated req.body
        const newTruck = new Truck(req.body);

        // Save Truck to DB
        const truck = await newTruck.save();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(truck);
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

export async function updateTruck(req, res) {
    const truck = await Truck.findByIdAndUpdate(
        req.params.truckId,
        {
            $set: req.body
        },
        { new: true }
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(truck);
}

export async function deleteTruck(req, res) {
    const truck = await Truck.findById(req.params.truckId);
    if (truck != null) {
        const removedTruck = await Truck.findByIdAndRemove(req.params.truckId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(removedTruck);
    } else {
        let err = new Error('Truck ' + req.params.truckId + ' not found!');
        res.statusCode = 404;
        return next(err);
    }
}

export async function deleteAllTrucks(req, res) {
    try {
        const resp = await Truck.deleteMany({});

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
}
