// Import dependencies
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as passportJWT from 'passport-jwt';
const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;

import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { CFSAdmin } from '../../models/cfsAdmin';
// import { Operator } from '../../models/operator';
// import { Tokens } from '../../models/token';

/**
 * Configure passport to use local strategy.
 * Authenticates using email and password.
 */

export const localAdminStrategy = passport.use(
    'local-admin',
    new LocalStrategy(CFSAdmin.authenticate())
);

// export const localOperatorStrategy = passport.use('local-operator', Operator.createStrategy());

passport.serializeUser((obj, done) => {
    CFSAdmin.serializeUser(obj)
        .then((admin) => done(null, admin))
        .catch((err) => done('pass'));
});

passport.serializeUser((obj, done) => {
    Operator.serializeUser(obj)
        .then((operator) => done(null, operator))
        .catch((err) => done('pass'));
});

passport.deserializeUser((obj, done) => {
    CFSAdmin.deserializeUser(obj)
        .then((admin) => done(null, admin))
        .catch((err) => done('pass'));
});

passport.deserializeUser((obj, done) => {
    Operator.deserializeUser(obj)
        .then((operator) => done(null, operator))
        .catch((err) => done('pass'));
});

// passport.deserializeUser(User.deserializeUser());

// Creates a JWT using secret key
// export const getToken = (user) => {
//     return jwt.sign(user, process.env.PASSPORT_SECRET_KEY, {
//         expiresIn: 10000
//     });
// };

// Options to control how token is extracted from request or verified
//const opts: IOptions = {};
// const opts = Object.create({});
// /**
//  * Configuration to read JWT
//  * from http Auth header with the scheme 'bearer'
//  */
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;

// export const jwtPassport = passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//         User.findById(jwt_payload._id)
//             .then((user) => {
//                 if (user) {
//                     // User successfully authenticated
//                     return done(null, user);
//                 } else {
//                     // Credentials not valid
//                     return done(null, false);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 return done(err, false);
//             });
//     })
// );

// To verify user credentials using jwt
// export const verifyUser = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         if (err || !user) {
//             res.status(403).json({
//                 success: false,
//                 errors: 'You are not authenticated!'
//             });
//         } else {
//             req.user = user;
//             return next();
//         }
//     })(req, res, next);
// };

// To verify user credentials using jwt
// export const getVerifiedUser = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         req.user = user;
//         return next();
//     })(req, res, next);
// };

// // Verify whether use is an admin
// export const verifyAdmin = (req, res, next) => {
//     if (req.user.isAdmin) {
//         next();
//     } else {
//         const err = new Error('You are not authorised!');
//         res.statusCode = 403;
//         res.json({
//             success: false,
//             errors: 'You are not authorised!'
//         });
//     }
// };
