const Validator = require("validator");
const isEmpty = require("../until/is-empty");

module.exports = function validateLoginInput(data) {
	let errors = {};
	
	if (!Validator.isLength(data.name, {min: 2,max: 20})){
		errors.name = "名字长度不能小于2位并且不能大于20位！";
	}
	
	return{
		errors,
		isValid:isEmpty(errors)
	}
}
