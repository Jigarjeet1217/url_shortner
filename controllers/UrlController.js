const { nanoid } = require("nanoid");
const { errorHandler } = require("../common/commonfunctions");
const Urls = require("../models/Urls");
const validator = require('validator')

class UserController {

	async shortenUrl(body = {}, id_user) {
		try {
			let { target_url, short_url } = body;
			if (!target_url) errorHandler('Target Url is mandatory!!!');

			let isValidTargetUrl = validator.isURL(target_url);
			if (!isValidTargetUrl) errorHandler('Url is invalid!!!');

			let shortCode = short_url ?? nanoid(global.config.nanoIdLength);

			let saved = await Urls.query().insert({ target_url, short_url: shortCode, id_user });
			return saved;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserController;