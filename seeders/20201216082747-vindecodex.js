"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert("users", [
			{
				name: "Vincent Villaluna",
				email: "villalunavincent@gmail.com",
				password: bcrypt.hashSync("secret123"),
				reset_password_token: "",
				reset_password_expires: null,
				created_at: new Date(),
				updated_at: new Date()
			}
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
