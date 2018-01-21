
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('kropotkin', table=>{
      table.increments('id').primary();
      table.text('paragraph').notNullable();
    }),
    knex.schema.createTable('space', table=>{
      table.increments('id').primary();
      table.text('address').notNullable();
      table.text('notes').notNullable();
      table.specificType('position', 'geometry(point, 4326)');
    }),
    knex.schema.createTable('time', table=>{
      table.increments('id').primary();
      table.text('notes').notNullable();
    }),
    knex.schema.createTable('type', table=>{
      table.increments('id').primary();
      table.text('name').notNullable();
    }),
    knex.schema.createTable('tag', table=>{
      table.increments('id').primary();
      table.text('name').notNullable();
    }),
  ]).
  then(()=>{
    return Promise.all([
      knex.schema.createTable('subtype', table=>{
        table.increments('id').primary();
        table.text('name').notNullable();
        table.integer('type_id').unsigned()
        table.foreign('type_id').references('type.id')
      }),
      knex.schema.createTable('thing', table=>{
        table.increments('id').primary();
        table.text('what').notNullable();
        table.text('how').notNullable();
        table.text('notes').notNullable();
        table.integer('type_id').unsigned()
        table.foreign('type_id').references('type.id')
      }),
      knex.schema.createTable('event', table=>{
        table.increments('id').primary();
        table.date('dt_start').notNullable(); //with tz_id
        table.date('dt_end').notNullable();
        table.text('by_day')   // string array postgres
        table.integer('time_id').unsigned()
        table.foreign('time_id').references('time.id')
      }),
      knex.schema.createTable('thing_tag', table=>{
        table.integer('thing_id').unsigned()
        table.foreign('thing_id').references('thing.id')
        table.integer('tag_id').unsigned()
        table.foreign('tag_id').references('tag.id')
      }),
      knex.schema.createTable('thing_subtype', table=>{
        table.integer('subtype_id').unsigned()
        table.foreign('subtype_id').references('subtype.id')
        table.integer('thing_id')
        table.foreign('thing_id').references('thing.id')
      }),

    ])
  })
    .then(()=>{
      return Promise.all([
        knex.schema.createTable('shareable', table=>{
          table.increments('id').primary();
          table.text('summary').notNullable();
          table.text('headline').notNullable();
          table.integer('thing_id').unsigned()
          table.foreign('thing_id').references('thing.id');
          table.integer('space_id').unsigned()
          table.foreign('space_id').references('space.id');
          table.integer('time_id').unsigned()
          table.foreign('time_id').references('time.id')
        })
      ])

    });
};

exports.down = function(knex, Promise) {
  return Promise
    .all([
      knex.schema.dropTable('shareable'),
      knex.schema.dropTable('event'),
      knex.schema.dropTable('thing_tag'),
      knex.schema.dropTable('thing_subtype'),
      knex.schema.dropTable('kropotkin'),
    ])
    .then(()=>
      Promise.all([
        knex.schema.dropTable('thing'),
        knex.schema.dropTable('space'),
        knex.schema.dropTable('time'),
        knex.schema.dropTable('subtype'),
        knex.schema.dropTable('tag'),
      ]))
    .then(()=>
      Promise.all([
        knex.schema.dropTable('type'),
      ]))
};
