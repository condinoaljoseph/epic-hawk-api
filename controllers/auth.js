const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const { Op } = require("sequelize");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
dayjs.extend(duration);

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

		user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
		user.resetPasswordExpires = dayjs()
			.add(dayjs.duration(1, "h"))
			.format("YYYY-MM-DD hh:mm:ss"); // 1 hour expiration

		// generate password reset
		await user.save();

		// send mail
		const link = `http://${req.headers.host}/auth/reset/${user.resetPasswordToken}`;

		const mailOptions = {
			to: user.email,
			from: process.env.FROM_EMAIL,
			subject: "Password reset request",
			text: `Hi ${user.name} \n
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

exports.reset = async (req, res) => {
	try {
		const { token } = req.params;

		const user = await User.findOne({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: {
					[Op.gt]: dayjs().format("YYYY-MM-DD hh:mm:ss")
				}
			}
		});

		if (!user) throw "user not found";

		res.status(200).json({
			success: true,
			message: "Password reset token is valid",
			data: user
		});
	} catch (e) {
		res.status(401).json({
			success: false,
			message: e.toString(),
			data: null
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: {
					[Op.gt]: dayjs().format("YYYY-MM-DD hh:mm:ss")
				}
			}
		});

		if (!user) throw "user not found";

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);
		user.resetPasswordToken = "";
		user.resetPasswordExpires = null;

		await user.save(); // TODO bycrypt

		res.status(200).json({
			success: true,
			message: "Your password has been updated",
			data: { user, password }
		});
	} catch (e) {
		res.status(401).json({
			success: false,
			message: e.toString(),
			data: null
		});
	}
};
