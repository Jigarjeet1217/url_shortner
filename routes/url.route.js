const express = require('express');
const UrlController = require('../controllers/UrlController');
const ResponseController = require('../common/ResponseController');
const { isAuthorized } = require('../middlewares/authenticated');
const Router = express.Router();

Router.post('/shorten', isAuthorized, async (req, res, next) => {
	let RC = new ResponseController();
	try {
		let UC = new UrlController();
		let data = await UC.shortenUrl(req.body, req.user.id_user);
		RC.success(res, { message: 'Url shortened!!!', data, isNew: true })
	} catch (error) {
		RC.failed(res, error);
	}
	next();
}, ResponseController.sendResponse)

module.exports = Router;