module.exports = function(app) {
    const db = require('../../models');
    const passport = require('passport');

    // @route GET api/chore/test
    // @desc tests the chore api route
    app.get('/api/chore/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        })
    })

    // @route GET api/chore
    // @desc get all chores for a given familyId
    app.get('/api/chore', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore.findAll({
            where: {
                familyId: req.user.familyId
            }
        }).then((chores) => {
            res.status(200).json(chores);
        }).catch((err) => {
            res.status(500).json(err);
        })
    })

    // @route POST api/users/test
    // @desc creates chore
    app.post('/api/chore', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore.create({
            description: req.body.description,
            pointValue: req.body.pointValue,
            familyId: req.user.familyId
        }).then((chore) => {
            res.json({
                data: chore,
                choreCreated: true,
                msg: 'Chore successfully created.'
            })
        }).catch((err) => {
            res.status(500).json(err);
        })
    })

    // @route PUT api/chore/:id
    // @desc updates a chore
    app.put('/api/chore/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore.update({
            description: req.body.description,
            pointValue: req.body.pointValue,
            isComplete: req.body.isComplete,
        },
        {
            where: {
                id: req.params.id
            }
        }).then((chore) => {
            res.json({
                choreUpdated: true,
                msg: 'Chore successfully updated.'
            })
        }).catch((err) => {
            res.status(500).json(err);
        })
    })

    // @route DELETE api/chore/:id
    // @desc deletes a chore
    app.delete('/api/chore/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.chore.destroy({
            where: {
                id: req.params.id
            }
        }).then((chore) => {
            res.json({
                choreDeleted: true,
                msg: 'Chore successfully deleted.'
            })
        }).catch((err) => {
            res.status(500).json(err);
        })
    })


}
