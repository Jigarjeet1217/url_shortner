const knexfile = require('../knexfile.js');
let knex = require('knex');
let { Model } = require('objection');

let db;


(async () => {
	db = knex(knexfile.development);

	// bind all knex instances to objection model
	Model.knex(db);
})()

console.log(db)

module.exports = db;