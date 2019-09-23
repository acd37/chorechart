module.exports = function(sequelize, Sequelize) {
    const Family = sequelize.define('family', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        familyCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        familyName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Family.associate = function(models) {
        Family.hasMany(models.user, {
            onDelete: 'SET NULL'
        });
        Family.hasMany(models.chore, {
            onDelete: 'cascade'
        });
    };

    return Family;
};
