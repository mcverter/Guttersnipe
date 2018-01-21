import 'knex';

export default class BaseModel{
  insertInTable(tablename, attributes) {
    return knex(tablename).insert(attributes);
  }
}
