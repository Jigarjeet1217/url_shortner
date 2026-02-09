const { hashPassword } = require("../common/hashPassword");
const Users = require("../models/Users");

class UserController {

	async signupUser(body) {
		try {
			await this.doesEmailAlreadyExist(body.email);
			if (body.password) body.password = hashPassword(body.password);
			await Users.query().insert(body);
			return "User added!!!";
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmail(email) {
		try {
			let existingUser = await Users.query().select('password', 'id_user').findOne({ email });
			return existingUser;
		} catch (error) {
			throw error;
		}
	}

	async doesEmailAlreadyExist(email) {
		try {
			let existingUser = this.getUserByEmail(email);
			if (existingUser) {
				throw "A user with this email already exists. Please use another email!!!";
			}
			return false;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserController;