import express from 'express';

import isEmpty from 'is-empty';
import { CFSAdmin } from '../models/cfsAdmin';
import { Operator } from '../models/operator';

// Import middlewares
import passport from 'passport';

// Load input validation
import { validateRegisterInput } from '../utils/validation/register';
import { validateLoginInput } from '../utils/validation/login';

/**
 * @route POST operators/register
 * @desc Register operator
 */
export async function registerOperator(req, res, next) {
    // Validate operator input
    const { errors, success } = validateRegisterInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({ success: false, errors: errors });
    }

    // Check whether there are duplicate emails
    Operator.findOne({ username: req.body.username })
        .then((operator) => {
            if (operator) {
                return res.status(400).json({
                    success: false,
                    errors: { username: 'username already exists' }
                });
            } else {
                Operator.register(
                    new Operator({
                        username: req.body.username
                    }),
                    req.body.password,
                    async (err, operator) => {
                        if (err) {
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                success: false,
                                errors: err
                            });
                        } else {
                            if (req.body.name) {
                                operator.name = req.body.name;
                            }

                            if (req.body.details) {
                                operator.details = req.body.details;
                            }

                            if (req.body.cfsAdmin) {
                                try {
                                    await CFSAdmin.findByIdAndUpdate(
                                        req.body.cfsAdmin,
                                        {
                                            $addToSet: {
                                                operators: operator._id
                                            }
                                        }
                                    );
                                } catch (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                }
                            }

                            operator.save((err) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json'
                                    );
                                    return res.json({
                                        success: false,
                                        message: err.message
                                    });
                                }

                                passport.authenticate('local-operator')(
                                    req,
                                    res,
                                    () => {
                                        const newOperator = {
                                            username: operator.username,
                                            _id: operator._id
                                        };

                                        res.statusCode = 200;
                                        res.setHeader(
                                            'Content-Type',
                                            'application/json'
                                        );
                                        res.json({
                                            success: true,
                                            status: 'Registration Successful!',
                                            data: newOperator,
                                            errors: {}
                                        });
                                    }
                                );
                            });
                        }
                    }
                );
            }
        })
        .catch((err) => console.log(err));
}

// Authenticate operator with custom error message
export const authenticateLogin = (req, res, next) => {
    // Form validation
    const { errors, success } = validateLoginInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        passport.authenticate(
            ['local-operator'],
            { session: false },
            (err, operator) => {
                if (err || !operator) {
                    return res.status(401).json({
                        success: false,
                        errors: {
                            message: 'username or password is incorrect'
                        }
                    });
                } else {
                    req.operator = operator;
                    return next();
                }
            }
        )(req, res, next);
    }
};

/**
 * @route POST operators/login
 * @desc Login operator
 */
export const loginOperator = (req, res, next) => {
    Operator.findById(req.operator._id).then((operator) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            message: 'You are successfully logged in!',
            username: operator.username,
            userId: operator._id,
            userType: 'operator',
            errors: {}
        });
    });
};

/**
 * @route GET /operators
 * @desc Get a list of all operators. Admin only.
 */
export async function getAllOperators(req, res, next) {
    try {
        const operators = await Operator.find({});

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(operators);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

/**
 * @route GET /operators/profiles
 * @desc Get the current operator
 */
export async function getOperator(req, res, next) {
    try {
        const operator = await Operator.findOne({
            username: req.params.username
        }).populate('warehouses');
        // .populate('warehouses schedules');
        if (operator != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(operator);
        } else {
            res.statusCode = 404;
            res.send(`username ${req.params.username} not found!`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

/**
 * @route PUT /operators/profiles.
 * @desc edit an existing entry for the current operator's profile.
 */
export const putOperator = async (req, res, next) => {
    if (req.body.username) {
        const operator = await Operator.find({
            username: req.body.username
        });
        if (!isEmpty(operator)) {
            console.log('username is taken');
            res.status(400).json({
                error: 'Bad Request',
                message: 'username is taken!'
            });
            return;
        }
    }

    const operator = await Operator.findOne({
        username: req.params.username
    });

    if (req.body.cfsAdmin) {
        await CFSAdmin.findByIdAndUpdate(req.body.cfsAdmin, {
            $addToSet: { operators: operator._id }
        });
    }

    Operator.findByIdAndUpdate(
        operator._id,
        {
            $set: req.body
        },
        { new: true }
    )
        .then((operator) => {
            console.log(operator);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (res.locals) {
                res.locals.operator = operator;
                res.send(res.locals);
            } else res.send(operator);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};

// export const getOperatorOperators = async (req, res, next) => {
//     const operator = await Operator.find({
//         username: req.params.username
//     });
//     if (isEmpty(operator)) {
//         return res
//             .status(404)
//             .json({ errors: { message: 'Operator does not exist!' } });
//     }

//     const operators = await Operator.find({
//         _id: { $in: operator[0].operators }
//     });

//     if (isEmpty(operators)) {
//         return res.status(404).json({
//             errors: { message: 'Operator does not have any operators!' }
//         });
//     }

//     return res.status(200).json({ operators });
// };

// export const getOperatorWarehouses = async (req, res, next) => {
//     const operator = await Operator.find({
//         username: req.params.username
//     });
//     if (isEmpty(operator)) {
//         return res
//             .status(404)
//             .json({ errors: { message: 'Operator does not exist!' } });
//     }

//     const warehouses = await Warehouse.find({
//         _id: { $in: operator[0].warehouses }
//     });

//     if (isEmpty(warehouses)) {
//         return res.status(404).json({
//             errors: { message: 'Operator does not have any warehouses!' }
//         });
//     }

//     return res.status(200).json({ warehouses });
// };
