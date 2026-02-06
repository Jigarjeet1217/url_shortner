const { Model } = require("objection");

class BaseModel extends Model {

	$beforeInsert(context) {
		// console.log('model name', this.constructor.name);
		// console.log('tableName', this.constructor.tableName);
		if (this.constructor.name === 'Users') require('./validations/UserValidations')(this);
		this.created_date = (new Date()).toISOString();
		console.log(this);
	}

}

module.exports = BaseModel;