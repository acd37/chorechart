module.exports = function(app) {
    const db = require('../../models');
    const passport = require('passport');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/family/test', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        })
    })

    app.post('/api/family', passport.authenticate('jwt', { session: false }), (req, res) => {

        db.user.findOne({
            where: {
                id: req.user.id
            }
        }).then((user) => {
            if (user.familyId) {
                return res.status(400).json({ familyId: 'You are already a member of a family.' });
            } else {
                db.family.create(req.body).then((family) => {
                    res.status(201).json({
                        data: family,
                        message: "Family successfully created.",
                        familyCreated: true
                    })    
                }).catch((err) => {
                        res.status(500).json(err);
                    })
                }
            }
        )


        
    })

}