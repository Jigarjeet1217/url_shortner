const jwt = require("jsonwebtoken");
const { errorHandler } = require("../common/commonfunctions");
const { sendResponse } = require("../common/ResponseController");
const ResponseController = require("../common/ResponseController");

module.exports = {
	authenticated: (req, res, next) => {
		let RC = new ResponseController();
		try {
			let tokenBearer = req.cookies['Authorization'] || req.cookies['authorization'] || '';

			if (!tokenBearer) {
				throw {
					type: 'Unauthorized',
					msg: "Please login to access the resource!!!"
				};
			};

			if (!tokenBearer.startsWith('Bearer')) {
				return res.json({ error: 'Authorization header must start with Bearer!' })
			}

			let [b, token] = tokenBearer.split(' ');

			//  verifying token
			let decoded = jwt.verify(token, global.config.jwt.jwtSecret);
			req.user = decoded;

			next();
		} catch (error) {
			RC.failed(res, error);
			// return sendResponse(req, res) // commenting here to fix for login route
			next();
		}
	},
	isAuthorized: (req, res, next) => {
		if (!req.user) {
			return sendResponse(req, res)
		}
		next();
	}
}