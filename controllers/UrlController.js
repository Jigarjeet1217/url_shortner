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

	async retreiveTargetUrl(shortCode) {
		try {
			let data = await Urls.query().select('id_url', 'target_url').findOne({ short_url: shortCode });
			if (!data) errorHandler('Invalid Url');
			return data.target_url;
		} catch (error) {
			throw error;
		}
	}

	async retreiveUserCreatedUrls(id_user) {
		try {
			let data = await Urls.query().where({ id_user });
			return data;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserController;