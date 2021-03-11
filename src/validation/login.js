const Validator = require("validator");
const isEmpty = require("../until/is-empty");

module.exports = function validateLoginInput(data) {
	let errors = {};
	
	if (!Validator.isEmail(data.email)){
		errors.email = "邮箱不合法！";
	}
	
	return{
		errors,
		isValid:isEmpty(errors)
	}
}
