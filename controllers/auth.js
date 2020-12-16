const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../models");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			where: { email }
		});

		if (!user || !bcrypt.compareSync(password, user.password))
			throw "user not found";

		user.password = undefined;

		res.status(200).json({
			success: true,
			message: "login success",
			data: user
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			message: e.toString(),
			data: null
		});
	}
};

exports.recover = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({
			where: { email }
		});

		if (!user) throw "user not found";

		// generate password reset
		await User.update(
			{
				resetPasswordToken: crypto.randomBytes(20).toString("hex"),
				resetPasswordExpires: Date.now() + 3600000
			},
			{ where: { email } }
		);

		// send mail
		const link = `http://${req.headers.host}/auth/reset/${user.resetPasswordToken}`;

		const mailOptions = {
			to: user.email,
			from: process.env.FROM_EMAIL,
			subject: "Password reset request",
			text: `Hi ${user.username} \n 
			Please click on the following link ${link} to reset your password. \n\n 
			If you did not request this, please ignore this email and your password will remain unchanged.\n`
		};

		await sgMail.send(mailOptions);

		res.status(200).json({
			success: true,
			message: `A reset email has been sent to ${user.email}`
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			message: e.toString(),
			data: null
		});
	}
};
