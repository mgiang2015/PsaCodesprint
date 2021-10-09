const express = require('express');

const Warehouse = require('../models/warehouse');

const warehouseController = {
    getAllWarehouses(req, res) {
        try {
            Warehouse.find({}).then((warehouses) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(warehouses);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getWarehouse(req, res, next) {
        Warehouse.findById(req.params.warehouseId)
            .then((warehouse) => {
                if (warehouse != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(warehouse);
                } else {
                    let err = new Error(
                        'Warehouse ' + req.params.warehouseId + ' not found!'
                    );
                    res.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    },

    postWarehouse(req, res) {
        try {
            // Creates new Warehouse with the updated req.body
            const newWarehouse = new Warehouse(req.body);

            // Save Warehouse to DB
            const warehouse = await newWarehouse.save();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(warehouse);
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

    updateWarehouse(req, res) {
        const warehouse = await Warehouse.findByIdAndUpdate(
            req.params.warehouseId,
            {
                $set: req.body
            },
            { new: true }
        );

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(warehouse);
    },

    deleteWarehouse(req, res) {
        const warehouse = await Warehouse.findById(req.params.warehouseId);
        if (warehouse != null) {
            const removedWarehouse = await Warehouses.findByIdAndRemove(
                req.params.warehouseId
            );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(removedWarehouse);
        } else {
            let err = new Error(
                'Warehouse ' + req.params.warehouseId + ' not found!'
            );
            res.statusCode = 404;
            return next(err);
        }
    },
    deleteAllWarehouses(req, res) {
        try {
            const resp = await Warehouse.deleteMany({});

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (err) {
            res.statusCode = 500;
            res.send(err);
        }
    }
};

module.exports = warehouseController;
