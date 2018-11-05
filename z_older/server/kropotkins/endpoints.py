
from server import db, api
from flask import Blueprint, request, jsonify, make_response
from flask.ext.restful import Resource, Api, abort


class KropotkinEndpoint(Resource):
  def get(self):
    query="SELECT paragraph FROM kropotkin OFFSET floor(random()*(select count(*) from kropotkin)) LIMIT 1;"
    result = db.engine.execute(query)
    for row in result:
      response = jsonify({"paragraph": row[0]})
      response.status_code = 200
      return response
    return 400

api.add_resource(KropotkinEndpoint, '/api/kropotkin', endpoint = 'kropotkin')

