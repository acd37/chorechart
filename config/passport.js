const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            db.User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );
};
