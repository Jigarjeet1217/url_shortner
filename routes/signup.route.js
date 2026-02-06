const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();

Router.post('/', async (req, res, next) => {
	let resp = {};
	try {
		let UC = new UserController();

		let data = await UC.signupUser(req.body);
		resp.done = data;
	} catch (error) {
		resp.error = error;
	}
	res.send(resp);
	// next();
})

module.exports = Router;