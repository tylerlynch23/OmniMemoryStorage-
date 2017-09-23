/* users.js
 * Exports a router connecting the application to all user routes.
 */
const express  = require('express');
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const router   = express.Router();

const User    = require('../models/user');

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

router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE');
});

//Profile
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

module.exports = router;
