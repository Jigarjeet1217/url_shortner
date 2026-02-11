const express = require('express');
const UserController = require('../controllers/UserController');
const ResponseController = require('../common/ResponseController');
const { isAuthorized } = require('../middlewares/authenticated');
const Router = express.Router();

Router.post('/signup', isAuthorized, async (req, res, next) => {
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

Router.get('/logout', async (req, res, next) => {
	let RC = new ResponseController();
	try {
		res.clearCookie('Authorization');
		RC.success(res, { message: 'User logged out successfully!!!', data: null, isNew: false })
	} catch (error) {
		RC.failed(res, error);
	}
	next();
}, ResponseController.sendResponse)

module.exports = Router;