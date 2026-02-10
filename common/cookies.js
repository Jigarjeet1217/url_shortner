module.exports = {
	setCookies: (res, cookieName, cookieValue) => {
		res.cookie(cookieName, cookieValue, {
			...global.config.cookie, expires: new Date(Date.now() + global.config.cookie.maxAge)
		});
	}
}