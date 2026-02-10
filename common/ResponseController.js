let httpCodes = {
	ok: 200,
	created: 201,
	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notFound: 404,
	serverError: 500,
	badGateway: 502,
	serviceUnreachabe: 503
}

class ResponseController {
	constructor() {
		this.error = null;
		this.data = null;
		this.message = null;
		this.isNew = false;
		this.statusCode = httpCodes.ok;
	}

	assignStatusCodes(responseType) {
		let statusCode = null;
		switch (responseType.toUpperCase()) {
			case 'GET':
				statusCode = httpCodes.ok;
			case 'POST':
			case 'PUT':
				statusCode = httpCodes.created;
			default:
				statusCode = httpCodes.ok;
		}

		return statusCode;
	}

	success(res, { message, data, isNew = false }) {
		this.isNew = isNew;
		this.message = message;
		this.data = data;
		this.error = null;
		this.setResponseObj(res);
		res.locals.response.status = isNew ? httpCodes.created : httpCodes.ok;
	}

	failed(res, error) {
		// general convention - errors mush have property 'type'
		this.message = error.type;
		if (error.type === 'Error') {//general user defined validation on data
			this.error = error.msg;
		} else if (error.type === 'ModelValidation') {
			this.error = error.data
		}
		this.setResponseObj(res);
		res.locals.response.status = httpCodes.badRequest;
	}

	setResponseObj(res) {
		res.locals.response = {
			status: httpCodes.ok,
			success: this.error ? false : true,
			message: this.message,
			error: this.error,
			data: this.data
		};
	}

	static sendResponse(req, res) {
		let response = {}, status;

		for (let key of Object.keys(res.locals.response)) {
			if (key === 'status') status = res.locals.response[key];
			else {
				if (res.locals.response[key]) response[key] = res.locals.response[key];
			}
		}
		res.status(status).json(response);
	}
}



module.exports = ResponseController;