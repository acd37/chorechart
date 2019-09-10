module.exports = function(app) {

    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const keys = require('../../config/keys');
    
    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/auth/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        })
    })

    // @route POST api/users/login
	// @desc logs in a user
	app.post('/api/auth/login', (req, res) => {
		const {email, password} = req.body;

		// Find user by email
		db.user
			.findOne({ where: { email } })
			.then((user) => {
				// Check the user exists
				if (!user) {
					return res.status(404).json({ msg: 'User not found.' });
				}

				let currentUser = user.get();

				// Check the password
				bcrypt.compare(password, currentUser.password).then((isMatch) => {
					if (isMatch) {
						db.user
                            .findOne({ where: 
                                { id: user.id },
								include: [ 
                                    { model: db.family }, 
                                ]
							})
							.then((user) => {
								// create the payload
								const payload = {
                                    id: user.id,
                                    family: user.family ? user.family  : "You  are not currently assigned to a family group.",
									firstName: user.firstName,
									lastName: user.lastName
								};

								// sign the token
								jwt.sign(
									payload,
									keys.secretOrKey,
									{ expiresIn: 3600 * 12 },
									(err, token) => {
										res.json({
											...payload,
											success: true,
											token: `Bearer ${token}`
										});
									}
								);
							})
							.catch((err) => console.log(err));
					} else {
						return res.status(400).json({ msg: 'User password could not be validated.' });
					}
				});
			});
	});

}