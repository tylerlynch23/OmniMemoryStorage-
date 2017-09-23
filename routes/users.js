/* users.js
 * Exports a router connecting the application to all user routes.
 */
const express  = require('express');
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const router   = express.Router();

const config = require('../config/database')
const User   = require('../models/user');

const tokenExpirationTime = 1209600;

/* register
 * Creates a user object with information from a POST request
 * and attempts to add the user to the database.
 */
router.post('/register', (req, res, next) => {
  console.log(req.body);
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err) => {
    if(err){
      res.json({success: false, msg: 'Failed to register user'});
    }
    else{
      res.json({success: true, msg:'User registered'});
    }
  });
});

/* authenticate
 * Gets the username and password of the user from the body of the POST request
 * and looks up the user in the database by their username.  If the user is
 * found, we verify that they have the correct password, and if they do, we
 * generate a token with the user data and our secret and set an expiration time
 * for the token.  We return either true, the token, and the user information,
 * or false and an incorrect password based on the result of comparePassword.
 */
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: tokenExpirationTime
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          }
        })
      } else{
        return res.json({success: false, msg: 'Incorrect password'});
      }
    });
  });
});

/* profile
 * Endpoint for a profile page, protected by passport's authentication as seen
 * in the second parameter in router.get().  A GET request sent to this endpoint
 * will require an authentication token in it's header.  Currently returns the
 * JSON representation of the user.
 */
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
