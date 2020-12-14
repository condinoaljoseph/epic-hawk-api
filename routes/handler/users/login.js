const { User } = require("../../../models");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({
		where: { email }
	});

	if (!user || !bcrypt.compareSync(password, user.password)) {
		// user not found or wrong password
		res.status(400).json({
			success: false,
			message: "user not found",
			data: null
		});
	}

	user.password = undefined;
	res.status(200).json({
		success: true,
		message: "login success",
		data: user
	});
};
