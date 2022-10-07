module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Username cannot be empty"
                },
                len: {
                    args: [3, 20],
                    msg: "Username must be between 3 and 20 characters"
                },
                isAlphanumeric: {
                    msg: "Username must contain only letters and numbers"
                },
                notNull: {
                    msg: 'Username is required'
                }
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Email cannot be empty"
                },
                isEmail: {
                    msg: "Email must be a valid email address"
                },
                notNull: {
                    msg: 'Email is required'
                }
            }
        },
        role: {
            type: Sequelize.ENUM('User', 'Admin'),
            defaultValue: 'User'
        }
    });

    return User;
};