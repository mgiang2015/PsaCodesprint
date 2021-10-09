import express from 'express';
import { CFSAdmin } from '../models/cfsAdmin';
import { Warehouse } from '../models/warehouse';

export async function getAllWarehouses(req, res) {
    try {
        Warehouse.find({}).then((warehouses) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(warehouses);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getWarehouse(req, res, next) {
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
}

export async function postWarehouse(req, res) {
    try {
        // Creates new Warehouse with the updated req.body
        const newWarehouse = new Warehouse(req.body);

        // Save Warehouse to DB
        const warehouse = await newWarehouse.save();

        await CFSAdmin.findByIdAndUpdate(req.body.cfsAdmin, {
            $addToSet: { warehouses: newWarehouse._id }
        });

        await Operator.findByIdAndUpdate(req.body.cfsAdmin, {
            $addToSet: { warehouses: newWarehouse._id }
        });

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
}

export async function updateWarehouse(req, res) {
    const oldWarehouse = await Warehouse.findById(req.params.warehouseId);
    const warehouse = await Warehouse.findByIdAndUpdate(
        req.params.warehouseId,
        {
            $set: req.body
        },
        { new: true }
    );

    if (req.body.operator) {
        await Operator.findByIdAndUpdate(oldWarehouse.operator, {
            $pull: { warehouses: req.params.warehouseId }
        });
        await Operator.findByIdAndUpdate(req.body.operator, {
            $addToSet: { warehouses: Types.ObjectId(req.params.warehouseId) }
        });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(warehouse);
}

export async function deleteWarehouse(req, res) {
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (warehouse != null) {
        await Operator.findByIdAndUpdate(warehouse.operator, {
            $pull: {
                warehouses: warehouse._id
            }
        });

        await CFSAdmin.findByIdAndUpdate(warehouse.cfsAdmin, {
            $pull: {
                warehouses: warehouse._id
            }
        });

        const removedWarehouse = await Warehouse.findByIdAndRemove(
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
}

// export async function deleteAllWarehouses(req, res) {
//     try {
//         const resp = await Warehouse.deleteMany({});

//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     } catch (err) {
//         res.statusCode = 500;
//         res.send(err);
//     }
// }
