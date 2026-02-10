const express = require('express');
const UserController = require('../controllers/UserController');
const { setCookies } = require('../common/cookies');
const Router = express.Router();

Router.post('/signup', async (req, res, next) => {
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

Router.post('/login', async (req, res, next) => {
	try {
		let UC = new UserController();
		let token = await UC.loginUser(req.body);
		setCookies(res, 'Authorization', `Bearer ${token}`);
		res.json({ token });
	} catch (error) {
		res.json({ error });
	}
	// next();
})

module.exports = Router;