module.exports = function(app) {

    const express = require('express');
    const router = express.Router();
    const User = require('../../models/User');
    const passport = require('passport');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/auth/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        })
    })

}