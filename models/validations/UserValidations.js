

module.exports = (ref) => {
	let errors = {};

	let regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (ref.email && !regEx.test(ref.email)) {
		errors['email'] = 'Please enter valid email'
	}
	if (!ref.password) {
		errors['password'] = "Password is mandatory";
	}


	if (Object.keys(errors).length) throw errors;
}