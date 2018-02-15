
module.exports =
  class BaseController{
    selectOneRecord(id) {}
    selectAllRecords(){}
    insertOneRecord(recordJSON) {}
    insertManyRecords(manyRecordsJSON) {}
    createDBTable(knex, Promise) {}
    dropDBTable(knex, Promise) {}
    clearAllRecords() {}
  };



