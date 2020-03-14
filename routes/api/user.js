module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');
    const gravatar = require('gravatar');
    const multer = require('multer');
    const upload = multer({ dest: './uploads/' });
    const fs = require('fs');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/user/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route GET api/users/current
    // @desc gets the currently authenticated user
    app.get('/api/user/current', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .findOne({
                where: {
                    id: req.user.id
                },
                include: [{ model: db.family }]
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => console.log(err));
    });

    // @route POST api/users/
    // @desc creates a new user
    app.post('/api/user', (req, res) => {
        db.user
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (user) {
                    return res.status(400).json({
                        email: 'This email already exists. Cannot create account.'
                    });
                } else {
                    const thumbnail = gravatar.url(req.body.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });

                    const newUser = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        thumbnail
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

    // @route DELETE api/users/
    // @desc deletes a user
    app.delete('/api/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'User account successfully deleted.',
                    userDeleted: true
                });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

    // @route PUT api/users/:id
    // @desc updates a user
    app.put('/api/users/', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                },
                {
                    where: {
                        id: req.user.id
                    }
                }
            )
            .then(() => {
                db.user
                    .findByPk(req.user.id)
                    .then((data) => {
                        res.status(200).json({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            messages: {
                                user: 'User account successfully updated.'
                            },
                            userUpdated: true
                        });
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            });
    });

    // @route PUT api/users/password
    // @desc logs in a user
    app.put('/api/user/password', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { currentPassword, newPassword } = req.body;

        // Find user by email
        db.user.findOne({ where: { id: req.user.id } }).then((user) => {
            // Check the user exists
            if (!user) {
                return res.status(404).json({ email: 'User not found.' });
            }

            let currentUser = user.get();
            // Check the user entered the right currentPassword
            bcrypt
                .compare(currentPassword, currentUser.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // Check the password
                        bcrypt.compare(newPassword, currentUser.password).then((isMatch) => {
                            if (isMatch) {
                                return res.status(404).json({
                                    password:
                                        'Your new password cannot be the same as your current password.'
                                });
                            }

                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newPassword, salt, (err, hash) => {
                                    if (err) throw err;

                                    db.user
                                        .update(
                                            {
                                                password: hash
                                            },
                                            {
                                                where: {
                                                    id: req.user.id
                                                }
                                            }
                                        )
                                        .then(() => {
                                            db.user
                                                .findByPk(req.user.id)
                                                .then((data) => {
                                                    res.status(200).json({
                                                        messages: {
                                                            password:
                                                                'Password successfully updated.'
                                                        },
                                                        userUpdated: true
                                                    });
                                                })
                                                .catch((err) => {
                                                    res.status(500).json(err);
                                                });
                                        });
                                });
                            });
                        });
                    } else {
                        res.status(404).json({
                            password: 'Your current password could not be validated. '
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });

    // @route PUT api/users/avatar
    // @desc sets user avatar file
    app.put('/api/user/avatar', passport.authenticate('jwt', { session: false }), upload.single("avatarFile"), (req, res) => {       
        
        let extension = "";

        switch(req.file.mimetype) {
            case "image/jpeg":
                extension = ".jpeg";
                break;
            case "image/png":
                extension = ".png";
                break;
        }

        fs.rename(`./uploads/${req.file.filename}`, `./uploads/${req.user.id}${extension}`, () => {
            console.log(`${req.file.filename} renamed to ${req.user.id}${extension}`)
        })

        res.status(200).json({
            msg: "Avatar saved."
        })
    });
};
