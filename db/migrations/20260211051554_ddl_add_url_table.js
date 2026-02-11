exports.up = function (knex) {
	return knex.schema.raw(`
		create table if not exists urls(
			id_url int4 generated always as identity primary key,
			short_url varchar(255) not null,
			target_url varchar(255) not null,
			id_user int4 not null,
			flag_deleted int2 default 0,
			created_date timestamp default current_timestamp not null,
			updated_date timestamp null,
			CONSTRAINT url_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id_user)
		);
	`)
};

exports.down = function (knex) {

};
