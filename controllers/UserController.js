const { hashPassword } = require("../common/hashPassword");
const Users = require("../models/Users");

class UserController {

	async signupUser(body) {
		try {

			let doesEmailExist = await this.doesEmailAlreadyExist(body.email);
			if (doesEmailExist) throw doesEmailExist.msg;

			if (body.password) {
				body.password = hashPassword(body.password);
			}
			await Users.query().insert(body);
			return "User added!!!";
		} catch (error) {
			throw error;
		}
	}

	async doesEmailAlreadyExist(email) {
		try {
			let existingUser = await Users.query().findOne({ email });

			return existingUser ? { msg: "A user with this email already exists. Please use another email!!!" } : false;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserController;