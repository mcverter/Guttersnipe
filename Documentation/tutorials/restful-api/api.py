from flask import Flask, request
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort

app = Flask(__name__)
api = Api(app)

todos = {}
TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}

resource_fields = {
    'task': fields.String,
    'uri': fields.Url('todo_ep')
}

def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesnt exist".format(todo_id))

parser = reqparse.RequestParser()
parser.add_argument('rate', type=int, help='Rate to charge')
parser.add_argument('task')
class Todo1(Resource):
    def get(self):
        return {'task': 'Hello world'}

class Todo2(Resource):
    def get(self):
        return {'task': 'Hello world'}, 201

class Todo3(Resource):
    def get(self):
        return {'task': 'Hello world'}, 201, {'Etag': 'some-string'}


class TodoSimple(Resource):
    def get(self, todo_id):
        return {todo_id: todos[todo_id]}

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class Todo(Resource):
    @marshal_with(resource_fields)
    def getWithDao(self, **kwargs):
        return TodoDao(todo_id='my_todo', task='rmemeber milk')

    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201

class TodoList:
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201

class TodoDao(object):
    def __init__(self, todo_id, task):
        self.todo_id = todo_id
        self.task = task

        self.status = 'active'
api.add_resource(Todo, '/todo<int:todo_id>')
api.add_resource(TodoList, '/todos')
api.add_resource(TodoSimple, '/<string:todo_id>')
api.add_resource(HelloWorld, '/', '/hello')

if __name__ == '__main__':
    app.run(debug=True)