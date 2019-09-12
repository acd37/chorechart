module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/user/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        })
    })

    // @route POST api/users/
	// @desc creates a new user
	app.post('/api/users', (req, res) => {
		db.user
			.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((user) => {
				if (user) {
					return res.status(400).json({ email: 'This email already exists.' });
				} else {
					const newUser = {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: req.body.password
					};

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;

							db.user
								.create(newUser)
								.then((user) => {
									res.status(200).json({
										message: 'User account successfully created.',
										userCreated: true
									});
								})
								.catch((err) => console.log(err));
						});
					});
				}
			});
	});

	app.delete('/api/users/:id', (req, res) => {
		db.user.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.status(200).json({
				message: "User account successfully deleted",
				userDeleted: true
			});
		}).catch((err) => {
			res.status(500).json(err);
		});
	});

}
