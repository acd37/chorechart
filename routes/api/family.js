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
            .then((family) => res.status(200).json(family))
            .catch((err) => console.log(err));
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
                { where: { id } }
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
