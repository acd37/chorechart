module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        choreWeeksWon: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        chorePoints: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    User.associate = function(models) {
        User.belongsTo(models.family, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
};
