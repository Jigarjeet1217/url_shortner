const BaseModel = require("./BaseModel");

class Urls extends BaseModel {

	static get tableName() {
		return 'urls';
	}

	static get idColumn() {
		return 'id_url';
	}

	static get modifiers() {
		return {
			nonDeleted: query => {
				query.where({ flag_deleted: 0 })
			}
		}
	}

	static get relationMappings() {
		return {

		}
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [],
			properties: {
				id_url: { type: 'integer' },
				short_url: { oneOf: [{ type: 'string', minLength: 1 }] },
				target_url: { oneOf: [{ type: 'string', minLength: 1 }] },
				id_user: { type: 'integer' },
				flag_deleted: { type: 'integer', default: 0 },
				created_date: { type: 'string', format: 'date-time' },
				updated_date: { type: ['string', 'null'], format: 'date-time', default: null }
			}
		}
	}
}

module.exports = Urls;