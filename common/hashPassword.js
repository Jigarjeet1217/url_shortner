const bcrypt = require('bcrypt');

module.exports = {
	hashPassword: (password) => {
		let salt = global.config.jwt.jwtSecret;
		return bcrypt.hashSync(password, salt.length);
	}
}