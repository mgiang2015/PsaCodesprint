const express = require('express');

const Truck = require('../models/truck');

const truckController = {
    getAllTrucks(req, res) {
        try {
            Truck.find({}).then((trucks) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(trucks);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getTruck(req, res, next) {
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
    },

    postTruck(req, res) {
        try {
            // Creates new Truck with the updated req.body
            const newTruck = new Trucks(req.body);

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
    },

    updateTruck(req, res) {
        const truck = await Trucks.findByIdAndUpdate(
            req.params.truckId,
            {
                $set: req.body
            },
            { new: true }
        );

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(truck);
    },

    deleteTruck(req, res) {
        const truck = await Trucks.findById(req.params.truckId);
        if (truck != null) {
            const removedTruck = await Trucks.findByIdAndRemove(
                req.params.truckId
            );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(removedTruck);
        } else {
            let err = new Error('Truck ' + req.params.truckId + ' not found!');
            res.statusCode = 404;
            return next(err);
        }
    }
};

module.exports = truckController;
