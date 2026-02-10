const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		let tokenBearer = req.cookies['Authorization'] || req.cookies['authorization'];

		if (!tokenBearer) next();

		if (!tokenBearer.startsWith('Bearer')) {
			return res.json({ error: 'Authorization header must start with Bearer!' })
		}

		let [b, token] = tokenBearer.split(' ');

		//  verifying token
		let decoded = jwt.verify(token, global.config.jwt.jwtSecret);
		req.user = decoded;

		next();
	} catch (error) {
		throw error;
	}
}