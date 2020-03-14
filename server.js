const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const passport = require('passport');
const chalk = require('chalk');
const { morganConfig } = require('./config/morganConfig');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');

// Helmet
app.use(helmet());

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Morgan
app.use(morganConfig);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
require('./routes/api/user')(app);
require('./routes/api/auth')(app);
require('./routes/api/chore')(app);
require('./routes/api/family')(app);

// Models
const db = require('./models');

db.sequelize.sync({ alter: true }).then(() => {
    // server static assets if in production
    if (process.env.NODE_ENV === 'production') {
        // set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    app.listen(port, () => console.log(`Server running on port ${chalk.green.bold(port)}!`));
});
