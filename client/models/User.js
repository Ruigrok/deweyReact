module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING
        },
        currentlyReading: {
            type: DataTypes.TEXT,
            allowNull:true
        },
        favoriteBook: {
            type: DataTypes.TEXT,
            allowNull:true
        },
        photoRef: {
            type: DataTypes.STRING            
        },
        nickname: {
            type: DataTypes.STRING
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Group, { through: models.UserGroup });
        User.hasMany(models.Library);
    };

    return User;
};
