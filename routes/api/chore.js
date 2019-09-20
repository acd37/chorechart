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
                success: true,
                msg: 'Chore successfully created.'
            })
        }).catch((err) => {
            res.status(500).json(err);
        })
    })


}
