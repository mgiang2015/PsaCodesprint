import express from 'express';

import isEmpty from 'is-empty';
import { CFSAdmin } from '../models/cfsAdmin';

// Import middlewares
import passport from 'passport';
// import { getToken } from '../utils/config/passport';
import Validator from 'validator';

// Load input validation
import { validateRegisterInput } from '../utils/validation/register';
import { validateLoginInput } from '../utils/validation/login';

/**
 * @route POST cfsAdmins/register
 * @desc Register cfsAdmin
 */
export const registerCFSAdmin = (req, res, next) => {
    // Validate cfsAdmin input
    const { errors, success } = validateRegisterInput(req.body);

    // Check validation
    if (!success) {
        return res.status(400).json({ success: false, errors: errors });
    }

    // Check whether there are duplicate emails
    CFSAdmin.findOne({ username: req.body.username })
        .then((cfsAdmin) => {
            if (cfsAdmin) {
                return res.status(400).json({
                    success: false,
                    errors: { username: 'username already exists' }
                });
            } else {
                CFSAdmin.register(
                    new CFSAdmin({
                        username: req.body.username
                    }),
                    req.body.password,
                    (err, cfsAdmin) => {
                        if (err) {
                            console.log(err);
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                success: false,
                                errors: err
                            });
                        } else {
                            if (req.body.stationName) {
                                cfsAdmin.stationName = req.body.stationName;
                            }

                            if (req.body.location) {
                                cfsAdmin.location = req.body.location;
                            }

                            if (req.body.phoneNo) {
                                cfsAdmin.phoneNo = req.body.phoneNo;
                            }

                            cfsAdmin.save((err) => {
                                if (err) {
                                    console.log(err);
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

                                passport.authenticate('local-admin')(
                                    req,
                                    res,
                                    () => {
                                        const newCFSAdmin = {
                                            username: cfsAdmin.username,
                                            _id: cfsAdmin._id
                                        };

                                        res.statusCode = 200;
                                        res.setHeader(
                                            'Content-Type',
                                            'application/json'
                                        );
                                        res.json({
                                            success: true,
                                            status: 'Registration Successful!',
                                            data: newCFSAdmin,
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
};

// Authenticate cfsAdmin with custom error message
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
            ['local-admin'],
            { session: false },
            (err, cfsAdmin) => {
                if (err || !cfsAdmin) {
                    return res.status(401).json({
                        success: false,
                        errors: {
                            message: 'username or password is incorrect'
                        }
                    });
                } else {
                    req.cfsAdmin = cfsAdmin;
                    return next();
                }
            }
        )(req, res, next);
    }
};

/**
 * @route POST cfsAdmins/login
 * @desc Login cfsAdmin
 */
export const loginCFSAdmin = (req, res, next) => {
    CFSAdmin.findById(req.cfsAdmin._id).then((cfsAdmin) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            message: 'You are successfully logged in!',
            username: cfsAdmin.username,
            userId: cfsAdmin._id,
            userType: 'cfsAdmin',
            errors: {}
        });
    });
};

/**
 * @route GET /cfsAdmins
 * @desc Get a list of all cfsAdmins. Admin only.
 */
export async function getAllCFSAdmins(req, res, next) {
    try {
        const cfsAdmins = await CFSAdmin.find({});

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cfsAdmins);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

/**
 * @route GET /cfsAdmins/profiles
 * @desc Get the current cfsAdmin
 */
export async function getCFSAdmin(req, res, next) {
    try {
        const cfsAdmin = await CFSAdmin.findOne({
            username: req.params.username
        }).populate('warehouses operators trucks');
        // .populate('warehouses operators trucks schedules');
        if (cfsAdmin != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cfsAdmin);
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
 * @route PUT /cfsAdmins/profiles.
 * @desc edit an existing entry for the current cfsAdmin's profile.
 */
export const putCFSAdmin = async (req, res, next) => {
    if (req.body.username) {
        const cfsAdmin = await CFSAdmin.find({
            username: req.body.username
        });
        if (!isEmpty(cfsAdmin)) {
            console.log('username is taken');
            res.status(400).json({
                error: 'Bad Request',
                message: 'username is taken!'
            });
            return;
        }
    }

    const cfsAdmin = await CFSAdmin.findOne({
        username: req.params.username
    });

    CFSAdmin.findByIdAndUpdate(
        cfsAdmin._id,
        {
            $set: req.body
        },
        { new: true }
    )
        .then((cfsAdmin) => {
            console.log(cfsAdmin);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (res.locals) {
                res.locals.cfsAdmin = cfsAdmin;
                res.send(res.locals);
            } else res.send(cfsAdmin);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};

// export const getCFSAdminOperators = async (req, res, next) => {
//     const cfsAdmin = await CFSAdmin.find({
//         username: req.params.username
//     });
//     if (isEmpty(cfsAdmin)) {
//         return res
//             .status(404)
//             .json({ errors: { message: 'CFSAdmin does not exist!' } });
//     }

//     const operators = await Operator.find({
//         _id: { $in: cfsAdmin[0].operators }
//     });

//     if (isEmpty(operators)) {
//         return res.status(404).json({
//             errors: { message: 'CFSAdmin does not have any operators!' }
//         });
//     }

//     return res.status(200).json({ operators });
// };

// export const getCFSAdminWarehouses = async (req, res, next) => {
//     const cfsAdmin = await CFSAdmin.find({
//         username: req.params.username
//     });
//     if (isEmpty(cfsAdmin)) {
//         return res
//             .status(404)
//             .json({ errors: { message: 'CFSAdmin does not exist!' } });
//     }

//     const warehouses = await Warehouse.find({
//         _id: { $in: cfsAdmin[0].warehouses }
//     });

//     if (isEmpty(warehouses)) {
//         return res.status(404).json({
//             errors: { message: 'CFSAdmin does not have any warehouses!' }
//         });
//     }

//     return res.status(200).json({ warehouses });
// };
