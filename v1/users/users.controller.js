const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwt = require('_helpers/jwt');

var VerifyToken = require('./VerifyToken');

// routes
router.post('/authenticate', function (req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
});

router.post('/register', function (req, res, next) {
    userService.register(req.body)
        .then(response => res.json(response))
        .catch(err => next(err));
});

router.get('/', VerifyToken, function (req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
});

module.exports = router;
