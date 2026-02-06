const Users = require("../models/Users");

class UserController {

	async signupUser(body) {
		try {
			let saved = await Users.query().insert(body);
			return saved;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserController;