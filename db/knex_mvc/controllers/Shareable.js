var knex = require('../knex');
const Promise = require('bluebird');

const knexPostgis = require ('knex-postgis');
const st = knexPostgis(knex);
const TABLES = require('./tables');

const BaseController = require('./BaseController');

  class Shareable extends BaseController{

  selectOneRecord(id) {
    return knex(TABLES.SHAREABLES)
      .join(TABLES.SPACES, `${TABLES.SHAREABLES}.space_id`, `${TABLES.SPACES}.id`)
      .join(TABLES.TIMES, `${TABLES.SHAREABLES}.time_id`, `${TABLES.TIMES}.id`)
      .join(TABLES.EVENTS, `${TABLES.EVENTS}.time_id`, `${TABLES.TIMES}.id`)
      .join(TABLES.THINGS, `${TABLES.SHAREABLES}.thing_id`, `${TABLES.THINGS}.id`)
      .join(TABLES.TYPES, `${TABLES.THINGS}.type_id`, `${TABLES.TYPES}.id`)
      .join(TABLES.SUBTYPES, `${TABLES.TYPES}.id`, `${TABLES.SUBTYPES}.type_id` )
      .select("headline", "summary", "address", "position", "what", "how", "dt_end", "dt_start", "by_day", "types.name as type_name", "subtypes.name as subtypes.name")
      .where({'shareables.id': id})
//knex.select('*').from('users').join('accounts', {'accountsHAREABLES.id': 'users.account_id'})

    /*    select headline, address, spaces.notes, st_astext(spaces.position),
      times.notes, events.by_day, events.dt_end, events.dt_start, things.how, things.what, types.name, subtypes.name
    from shareables
    join things on things.id = shareables.thing_id
    join spaces on spaces.id = shareables.space_id
    join times on times.id = shareables.time_id
    JOIN events on events.time_id = times.id
    JOIN types ON things.type_id = types.id
    JOIN thing_subtype on thing_subtype.thing_id = things.id
    JOIN subtypes on thing_subtype.subtype_id = subtypes.id

      .where({id})
      .select().from(TABLES.SHAREABLES)
      .join(TABLES.TIMES)

      .then()

*/
  }

    selectManyRecords() {

    }

    insertOneRecord(recordJSON) {
      return createShareable(recordJSON);
    }

    insertManyRecords(manyRecordsJSON) {
      return Promise.map(manyRecordsJSON, record=>{
        return this.insertOneRecord(record);
      })
    }

    createDBTable(knex, Promise) {
      return Promise.all([
        knex.schema.createTable(TABLES.SPACES, table=>{
          table.increments('id').primary();
          table.text('address').notNullable();
          table.text('notes').notNullable();
          table.specificType('position', 'geometry(point, 4326)');
        }),
        knex.schema.createTable(TABLES.TIMES, table=>{
          table.increments('id').primary();
          table.text('notes').notNullable();
        }),
        knex.schema.createTable(TABLES.TYPES, table=>{
          table.increments('id').primary();
          table.text('name').notNullable();
        }),
        knex.schema.createTable(TABLES.TAGS, table=>{
          table.increments('id').primary();
          table.text('name').notNullable();
        }),
      ]).
      then(()=>{
        return Promise.all([
          knex.schema.createTable(TABLES.SUBTYPES, table=>{
            table.increments('id').primary();
            table.text('name').notNullable();
            table.integer('type_id').unsigned();
            table.foreign('type_id').references(`${TABLES.TYPES}.id`)
          }),
          knex.schema.createTable(TABLES.THINGS, table=>{
            table.increments('id').primary();
            table.text('what').notNullable();
            table.text('how').notNullable();
            table.text('notes').notNullable();
            table.integer('type_id').unsigned();
            table.foreign('type_id').references(`${TABLES.TYPES}.id`)
          }),
          knex.schema.createTable(TABLES.EVENTS, table=>{
            table.increments('id').primary();
            table.date('dt_start').notNullable(); //with tz_id
            table.date('dt_end').notNullable();
            table.text('by_day')   // string array postgres
            table.integer('time_id').unsigned()
            table.foreign('time_id').references(`${TABLES.TIMES}.id`)
          }),
          knex.schema.createTable(TABLES.THING_TAG, table=>{
            table.integer('thing_id').unsigned()
            table.foreign('thing_id').references(`${TABLES.THINGS}.id`)
            table.integer('tag_id').unsigned()
            table.foreign('tag_id').references(`${TABLES.TAGS}.id`)
          }),
          knex.schema.createTable(TABLES.THING_SUBTYPE, table=>{
            table.integer('subtype_id').unsigned()
            table.foreign('subtype_id').references(`${TABLES.SUBTYPES}.id`)
            table.integer('thing_id')
            table.foreign('thing_id').references(`${TABLES.THINGS}.id`)
          }),

        ])
      })
        .then(()=>{
          return Promise.all([
            knex.schema.createTable(TABLES.SHAREABLES, table=>{
              table.increments('id').primary();
              table.text('summary').notNullable();
              table.text('headline').notNullable();
              table.integer('thing_id').unsigned()
              table.foreign('thing_id').references(`${TABLES.THINGS}.id`);
              table.integer('space_id').unsigned()
              table.foreign('space_id').references(`${TABLES.SPACES}.id`);
              table.integer('time_id').unsigned()
              table.foreign('time_id').references(`${TABLES.TIMES}.id`)
            })
          ])
        });
    }
    dropDBTable(knex, Promise) {
      return Promise
        .all([
          knex.schema.dropTable(TABLES.SHAREABLES),
          knex.schema.dropTable(TABLES.EVENTS),
          knex.schema.dropTable(TABLES.THING_TAG),
          knex.schema.dropTable(TABLES.THING_SUBTYPE),
        ])
        .then(()=>
          Promise.all([
            knex.schema.dropTable(TABLES.THINGS),
            knex.schema.dropTable(TABLES.SPACES),
            knex.schema.dropTable(TABLES.TIMES),
            knex.schema.dropTable(TABLES.SUBTYPES),
            knex.schema.dropTable(TABLES.TAGS),
          ]))
        .then(()=>
          Promise.all([
            knex.schema.dropTable(TABLES.TYPES),
          ]))
    }
    clearAllRecords() {}
  };



function  createShareable({summary, headline, notes, comments,
                            thing, time, space}) {
  return Promise.all([
    createTime(time),
    createSpace(space),
    createThing(thing)
  ]).then(ids=>{
    return knex(TABLES.SHAREABLES).insert({
      headline, summary,
      time_id: ids[0], space_id: ids[1], thing_id: ids[2]
    })
      .then(id=>{
        console.log(id)
      })
  })
}

function createTime({notes, events}) {
  let timeId;
  return knex(TABLES.TIMES).insert({notes}).returning('id')
    .then(tid=> {
      timeId = tid[0];
      return Promise.map(events, event => {
        const {dt_start, dt_end, by_day} = event;
        return knex(TABLES.EVENTS)
          .insert({dt_start, dt_end, by_day, time_id: timeId})
      })
    })
    .then(()=> {
      return timeId;
    })
}


function createSpace(
  {address, notes, longitude, latitude}) {
  return knex(TABLES.SPACES)
    .insert({address, notes,
      position: st.geomFromText(`Point(${latitude} ${longitude})`, 4326)
    })
    .returning('id')
    .then(sid=>{return sid[0];});
}

function createThing (thingJSON) {
  const {
    what,
    how,
    notes,
    type,
    subtypes,
    tags
  } = thingJSON;
  let typeId,
    thingId,
    sIDs;

  return (
    createType(type)
      .then(tid=>{
        typeId = tid[0];
        return Promise.map(subtypes, subtype=>{
          return createSubtype(Object.assign(subtype, {type_id: typeId}));
        })
      })
      .then(sids => {
        sIDs = sids;
        return knex(TABLES.THINGS)
          .insert({what, how, notes, type_id: typeId}).returning('id');
      })
      .then(thing_id=>{
        thingId = thing_id[0];
        return Promise.map(sIDs, sid=> {
          return knex(TABLES.THING_SUBTYPE).insert({thing_id: thingId, subtype_id: sid[0]})
        })
      })
      .then(()=>{
        return(thingId)
      })
  )}

function createType({name}) {
  return knex(TABLES.TYPES)
    .insert({name})
    .returning('id');
}

function createSubtype({name, type_id}) {
  return knex(TABLES.SUBTYPES)
    .insert({name, type_id})
    .returning('id')
}

function createTag({name}) {
  return knex(TABLES.TAGS)
    .insert({name})
    .returning('id')
}

module.exports = Shareable;
