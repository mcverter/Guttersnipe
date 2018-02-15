module.exports =
  class BaseModel{
    insertRecord(recordJSON) {}
    insertManyRecords(manyRecordsJSON) {}
    createDBTable(knex, Promise) {}
    dropDBTable(knex, Promise) {}
    clearAllRecords() {}
  };



