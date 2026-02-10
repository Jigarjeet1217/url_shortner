const { hashPassword, compareHashedPasswords, createJwtToken } = require("../common/commonfunctions");
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

	async loginUser(body) {
		try {
			let exUser = await this.getUserByEmail(body.email);
			if (!exUser) {
				throw `User with email ${body.email} does not exist!!!`
			}

			// for comparision bcrypt requires plain password and db stored password only 
			let isMatched = compareHashedPasswords(body.password, exUser.password);
			if (!isMatched) {
				throw "Invalid password!!!";
			}

			let token = createJwtToken(body);
			return token;
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