var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.shareable.findAll({include: models.thing})
    .then(result => {
      res.send(JSON.stringify(result)).status(200);
    })
    .catch(error => {
      console.log(error);
      res.send('respond with an error');

    });

});

module.exports = router;



/**
 *     points_query =   db.engine.execute(
 "select shareable.id, shareable.headline, ST_X(space.position), ST_Y(space.position) from shareable join space on space.id = shareable.space_id")\
 .fetchall()
 points_geoJSON_2 = [{"type": "Feature", "properties": {"id": j[0], "headline": j[1]},
                         "geometry": {"type": "Point", "coordinates": [j[3],  j[2]]}}
 for j in points_query]



 from server import db

 from marshmallow import  fields, Schema
 from server.calendars.schemas import ScheduleSchema
 from marshmallow_sqlalchemy import ModelSchema
 from server.shareables.models import Shareable, Thing, Space, Time, \
 MainType, Subtype, Comment
 from server.serializers.GeometrySerializationField import GeometrySerializationField

 class BaseSchema(ModelSchema):
 class Meta:
 sqla_session = db.Session

 class CommentSchema(BaseSchema):
 class Meta:
 model = Comment


 class ShareableSchema(BaseSchema):
 thing = fields.Nested('ThingSchema')
 time = fields.Nested('TimeSchema')
 space = fields.Nested('SpaceSchema')
 comments = fields.Nested('CommentSchema', many=True)

 class Meta:
 model = Shareable


 class ThingSchema(BaseSchema):
 main_type = fields.Nested('MainTypeSchema')
 subtypes = fields.String(many=True)

 class Meta:
 model = Thing

 class TimeSchema(BaseSchema):
 schedule = fields.Nested(ScheduleSchema)

 class Meta:
 model = Time

 class SpaceSchema(BaseSchema):
 position = GeometrySerializationField(attr='position')

 class Meta:
 model = Space

 class SubtypeSchema(BaseSchema):
 class Meta:
 model = Subtype

 class MainTypeSchema(BaseSchema):
 name = fields.String()
 class Meta:
 model = MainType


 class GeoJsonSchema(Schema):
 id = fields.Int()
 headline = fields.String()
 position = GeometrySerializationField


 *
 * Created by mitchell on 11/14/17.
 */
