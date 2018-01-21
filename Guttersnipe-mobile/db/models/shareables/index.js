import BaseModel from '../BaseModel'

export class Shareable {
  create(shareableJSON) {
    const {summary,
      headline,
      thing,
      time,
      space,
      notes,
      comments
    } = shareableJSON;
    Promises.all([
      Time.create(time),
      Space.create(space),
      Thing.create(thing)
    ]).then((time_id, space_id, thing_id)=>{
      console.log('foo');
      knex('shareable').insert({
        headline,
        notes,
        time_id,
        space_id,
        thing_id
      })
    })
  }
}

class Time {
  create(timeJSON) {
    let eventPromises =[];
    const {
      notes,
      events
    } = timeJSON;
    events.forEach(event=> {
      eventPromises.push(Event.create(event))
    });
    return Promises.all(eventPromises)
      .then(event_ids=>{
        Time.create(notes)
          .then(time_id=>{
            event_ids.forEach(event_id => {
                knex('event_times').insert({time_id, event_id})
              }
            )
          })
      })
  }
}

class Event {
  create(eventJSON) {
    const {
      dt_start,
      dt_end,
      by_day
    } = eventJSON
    return knex('event').insert(
      {dt_end, dt_start, by_day}
    )
  }
}

class createSpace {
  create(spaceJSON) {
    const {
      address,
      notes,
      longitude,
      latitude
    } = spaceJSON;
    return knex('space').insert(
      {address, notes,
        position: st.geomFromText(`Point(${latitude} ${longitude})`, 4326)
      })
  }
}

class Thing {
  create(thingJSON) {
    const {
      what,
      how,
      notes,
      type,
      subtypes,
      tags
    } = thingJSON
    return Type.create(type)
      .then(type_id=>{
        return Promise.all(subtypes.forEach(subtype=>{
          return Subtype.create(subtype, type_id);
        }))
      })
      .then(
        return knex('thing').insert()
      )
  }
}
class Type {
  create(typeJSON) {
    const {
      name
    } = typeJSON;
    return knex('type').insert(
      {name}
    )
  }

}

class Subtype {
  create(subtypeJSON) {
    const {
      name,
      type_id
    } = subtypeJSON;
    return knex('subtype').insert(
      {name, type_id}
    )
  }
}

class Tag {
  create(tagJSON) {
    const {
      name
    } = tagJSON;
    return knex('tag').insert(
      {name}
    )
  }
}
