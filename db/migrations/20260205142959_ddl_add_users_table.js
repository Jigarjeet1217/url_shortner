exports.up = function (knex) {
	return knex.schema.raw(`
		create table if not exists users(
			id_user int4 generated always as identity primary key,
			firstname varchar(50) not null,
			lastname varchar(50) null,
			email varchar(50) not null,
			password varchar(100) not null,
			flag_deleted int2 default 0,
			created_date timestamp default current_timestamp not null,
			updated_date timestamp null
		);
	`)
};

exports.down = function (knex) {

};
