// Import dependencies
import passport from 'passport';
import * as passportJWT from 'passport-jwt';
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { User } from '../../models/user';
// import { Tokens } from '../../models/token';

/**
 * Configure passport to use local strategy.
 * Authenticates using email and password.
 */
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// Creates a JWT using secret key
export const getToken = (user) => {
    return jwt.sign(user, process.env.PASSPORT_SECRET_KEY, {
        expiresIn: 10000
    });
};

// Options to control how token is extracted from request or verified
//const opts: IOptions = {};
const opts = Object.create({});
/**
 * Configuration to read JWT
 * from http Auth header with the scheme 'bearer'
 */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;

export const jwtPassport = passport.use(
    // TODO: types for jwt_payload and done
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._id)
            .then((user) => {
                if (user) {
                    // User successfully authenticated
                    return done(null, user);
                } else {
                    // Credentials not valid
                    return done(null, false);
                }
            })
            .catch((err) => {
                console.log(err);
                return done(err, false);
            });
    })
);

// To verify user credentials using jwt
export const verifyUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(403).json({
                success: false,
                errors: 'You are not authenticated!'
            });
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
};

// To verify user credentials using jwt
export const getVerifiedUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        req.user = user;
        return next();
    })(req, res, next);
};

// Verify whether use is an admin
export const verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        next();
    } else {
        const err = new Error('You are not authorised!');
        res.statusCode = 403;
        res.json({
            success: false,
            errors: 'You are not authorised!'
        });
    }
};
