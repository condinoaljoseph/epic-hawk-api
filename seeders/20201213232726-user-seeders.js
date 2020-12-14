"use strict";

const bcrypt = require("bcryptjs");
const faker = require("faker");

const data = (totalUser = 10) => {
	const users = [];

	for (let i = 0; i < totalUser; i++) {
		users.push({
			name: faker.name.findName(),
			email: faker.internet.exampleEmail(),
			password: bcrypt.hashSync("secret123"),
			created_at: new Date(),
			updated_at: new Date()
		});
	}

	return users;
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", data());
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
	}
};
