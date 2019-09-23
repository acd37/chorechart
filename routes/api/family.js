module.exports = function(app) {
    const db = require('../../models');
    const passport = require('passport');

    // @route GET api/family/test
    // @desc tests the family api route
    app.get('/api/family/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route GET api/family/
    // @desc gets all families
    app.get('/api/family/', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.family
            .findAll({})
            .then((family) => {
                res.status(200).json(family);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

    // @route GET api/family/current
    // @desc get family of currently logged in user
    app.get('/api/family/current', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.family
            .findOne({
                where: {
                    id: req.user.familyId
                },
                include: [{ model: db.user }, { model: db.chore }]
            })
            .then((family) => {
                if (!family) {
                    res.status(200).json({
                        family: 'This user account is not currently assigned to a family group.'
                    });
                } else {
                    res.status(200).json(family);
                }
            })
            .catch((err) => console.log(err));
    });

    // @route POST api/users/
    // @desc creates new family
    // adds family ID to user familyId
    app.post('/api/family', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .findOne({
                where: {
                    id: req.user.id
                }
            })
            .then((user) => {
                if (user.familyId) {
                    return res
                        .status(400)
                        .json({ familyId: 'You are already a member of a family.' });
                } else {
                    let familyId = '';

                    db.family.create(req.body).then((family) => {
                        familyId = family.id;
                        db.user
                            .update(
                                {
                                    familyId
                                },
                                {
                                    where: {
                                        id: user.id
                                    }
                                }
                            )
                            .then((user) => {
                                res.status(201).json({
                                    // For API Testing
                                    // NOTE: Remove prior to release.
                                    familyId: familyId,
                                    message: 'Family successfully created.',
                                    familyCreated: true
                                });
                            })
                            .catch((err) => {
                                res.status(500).json(err);
                            });
                    });
                }
            });
    });

    // @route DELETE api/users/:id
    // @desc deletes family
    app.delete('/api/family/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.family
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'Family successfully deleted.',
                    familyDeleted: true
                });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

    // @route PUT api/family/:id
    // @desc creates new family
    app.put('/api/family/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        // Find family by id
        db.family
            .update(
                {
                    familyCode: req.body.familyCode,
                    familyName: req.body.familyName
                },
                { where: { id: req.params.id } }
            )
            .then(() => {
                db.family
                    .findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then((family) => {
                        res.status(200).json({
                            ...family,
                            message: 'Family successfully updated.',
                            familyUpdated: true
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            family: 'Error. Family could not be updated. Please try again.'
                        });
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    family: 'Error. Family could not be updated. Please try again.'
                });
            });
    });
};
