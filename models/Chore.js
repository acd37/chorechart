module.exports = function (sequelize, Sequelize) {
    const Chore = sequelize.define('chore', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pointValue: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isComplete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Chore.associate = function (models) {
        Chore.belongsTo(models.family, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Chore;
};