const seedData = require('../../db-sequelize/seeders/seed-data');
const knexPostgis = require ('knex-postgis');
var knex = require('../knex');
const st = knexPostgis(knex);
const Promise = require('bluebird');

/*
const thing = {
  "how" : "On the south side of Atlantic Avenue near Court St in big dumpsters.",
    "what" : "",
    "type": {
    name: "food"
  },
  "subtypes": [{
    name: "dumpster"
  },
    {name: "flower"}],
  "notes": "Be forewarned, the initial reaction of this store’s management was to have the police ticket dumpster divers for trespass or littering"
}

*/

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.map(seedData, shareable=>{
    return createShareable(shareable);
  });
};


function  createShareable(shareableJSON) {
  const {
    summary,
    headline,
    thing,
    time,
    space,
    notes,
    comments
  } = shareableJSON;
  return Promise.all([
    createTime(time),
    createSpace(space),
    createThing(thing)
  ]).then(ids=>{
    return knex('shareable').insert({
      headline,
//      notes,
      summary,
      time_id: ids[0],
      space_id: ids[1],
      thing_id: ids[2]
    })
      .then(id=>{
        console.log(id)
      })
  })
}

function createTime({notes, events}) {
  console.log('in create time')
  let timeId;
  return knex('time').insert({notes}).returning('id')
    .then(tid=> {
      timeId = tid[0];
      return Promise.map(events, event => {
        const {dt_start, dt_end, by_day} = event;
        return knex('event')
          .insert({dt_start, dt_end, by_day, time_id: timeId})
      })
    })
    .then(()=> {
      return timeId;
    })
}


function createSpace(
  {address, notes, longitude, latitude}) {
  return knex('space')
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
        return knex('thing')
          .insert({what, how, notes, type_id: typeId}).returning('id');
      })
      .then(thing_id=>{
        thingId = thing_id[0];
        return Promise.map(sIDs, sid=> {
          return knex('thing_subtype').insert({thing_id: thingId, subtype_id: sid[0]})
        })
      })
      .then(()=>{
        return(thingId)
      })
  )}

function createType({name}) {
  return knex('type')
    .insert({name})
    .returning('id');
}

function createSubtype({name, type_id}) {
  return knex('subtype')
    .insert({name, type_id})
    .returning('id')
}

function createTag({name}) {
  return knex('tag')
    .insert({name})
    .returning('id')
}

