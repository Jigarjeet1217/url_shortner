const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	hashPassword: (password) => {
		let saltRounds = global.config.saltRounds;
		return bcrypt.hashSync(password, saltRounds);
	},
	compareHashedPasswords: async (plainPassword, encryptedPassword) => {
		return (await bcrypt.compare(plainPassword, encryptedPassword));
	},

	// signing jwt
	createJwtToken: (payload) => {
		return jwt.sign(payload, global.config.jwt.jwtSecret, global.config.jwt.jwtConfig);
	},

	errorHandler: (error, type = null) => {
		throw {
			type: type || 'Error',
			msg: error
		}
	}
}