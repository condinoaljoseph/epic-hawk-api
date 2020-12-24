'use strict';
const { Model } = require('sequelize');

// TODO create instance method on pre save in model
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: {
				type: DataTypes.STRING
			},
			resetPasswordToken: {
				type: DataTypes.STRING,
				field: 'reset_password_token'
			},
			resetPasswordExpires: {
				type: DataTypes.DATE,
				field: 'reset_password_expires'
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at'
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at'
			}
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users'
		}
	);

	return User;
};
