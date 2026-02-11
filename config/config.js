module.exports = {
	jwt: {
		jwtSecret: '$3cret&!@%&~*',
		jwtConfig: { algorithm: 'HS256' }
	},
	saltRounds: 16,
	cookie: {
		// signed: true,
		// sameSite: 'Strict',
		// secure: true,
		httpOnly: true,
		maxAge: 1 * 60 * 60 * 1000,// in milliseconds
	},
	nanoIdLength: 10
}