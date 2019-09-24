module.exports = function(app) {
    const db = require('../../models');
    const passport = require('passport');

    // @route GET api/chore/test
    // @desc tests the chore api route
    app.get('/api/chore/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route GET api/chore
    // @desc get all chores for a given familyId
    app.get('/api/chore', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore
            .findAll({
                where: {
                    familyId: req.user.familyId
                }
            })
            .then((chores) => {
                if (chores.length === 0) {
                    res.status(200).json({
                        chores: 'No chores assigned to family.'
                    });
                } else {
                    res.status(200).json(chores);
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

    // @route POST api/users/test
    // @desc creates chore
    app.post('/api/chore', passport.authenticate('jwt', { session: false }), (req, res) => {
        let randomNumber = Math.floor(Math.random() * 5 + 1);
        console.log(randomNumber);

        db.chore
            .create({
                description: req.body.description,
                pointValue: randomNumber,
                familyId: req.user.familyId
            })
            .then((chore) => {
                res.json({
                    data: chore,
                    choreCreated: true,
                    msg: 'Chore successfully created.'
                });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });

    // @route PUT api/chore/:id
    // @desc updates a chore
    app.put('/api/chore/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore
            .update(
                {
                    description: req.body.description,
                    isComplete: req.body.isComplete
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(() =>
                db.chore
                    .findOne({ where: { id: req.params.id } })
                    .then((chore) => {
                        res.status(200).json({
                            pointValue: chore.pointValue,
                            isComplete: chore.isComplete,
                            choreUpdated: true,
                            msg: 'Chore successfully updated.'
                        });
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    })
            )
            .catch((err) => {
                res.json({ error: 'Chore could not be updated at this time.' });
            });
    });

    // @route DELETE api/chore/:id
    // @desc deletes a chore
    app.delete('/api/chore/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((chore) => {
                res.json({
                    choreDeleted: true,
                    msg: 'Chore successfully deleted.'
                });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });
};
