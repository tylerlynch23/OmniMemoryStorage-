/* passport.js
 * This module lets you authenticate endpoints using a JSON web token and our
 * secret defined in config/dadtabase.js.
 */

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const User        = require('../models/user');
const config      = require('../config/database');

/* anonymous
 * Create an options object to be passed in to create a JwtStrategy for
 * authentication, made up of a JSON Web Token extracted from the header of the
 * user's HTTP request, add our secret defined in our database config.  The
 * strategy will return a payload containing user information.
 */
module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey    = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) =>{
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false)
      }
    });
  }));
}
