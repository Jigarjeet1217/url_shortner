const express = require('express');
const UserController = require('../controllers/UserController');
const { setCookies } = require('../common/cookies');
const ResponseController = require('../common/ResponseController');
const Router = express.Router();

Router.post('/signup', async (req, res, next) => {
	let RC = new ResponseController();
	try {
		let UC = new UserController();
		let data = await UC.signupUser(req.body);
		RC.success(res, { message: 'User Created', data, isNew: true })
	} catch (error) {
		RC.failed(res, error);
	}
	next();
}, ResponseController.sendResponse)

Router.post('/login', async (req, res, next) => {
	let RC = new ResponseController();
	try {
		let UC = new UserController();
		let data = await UC.loginUser(req.body);
		setCookies(res, 'Authorization', `Bearer ${data.token}`);
		RC.success(res, { message: 'User Logged In!', data })
	} catch (error) {
		RC.failed(res, error);
	}
	next();
}, ResponseController.sendResponse)

module.exports = Router;