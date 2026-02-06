const BaseModel = require("./BaseModel");

class Users extends BaseModel {

	static get tableName() {
		return 'users';
	}

	static get idColumn() {
		return 'id_user';
	}

	static get modifiers() {
		return {
			nonDeletedUsers: query => {
				query.where({ flag_deleted: 0 })
			}
		}
	}

	// $beforeValidate(jsonSchema, json, opt) {
	// 	return jsonSchema;
	// }

	static get relationMappings() {
		return {

		}
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [],
			properties: {
				id_user: { type: 'integer' },
				firstname: { type: 'string', minLength: 1 },
				lastname: { type: ['string', 'null'], default: null },
				email: { oneOf: [{ type: 'string', minLength: 1, format: 'email' }] },
				password: { oneOf: [{ type: 'string', minLength: 6 }] },
				flag_deleted: { type: 'integer', default: 0 },
				created_date: { type: 'string', format: 'date-time' },
				updated_date: { type: ['string', 'null'], format: 'date-time', default: null }
			}
		}
	}
}

module.exports = Users;