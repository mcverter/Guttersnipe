var express = require('express'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8000,
  knex = require('./knex');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/shareables', function(req, res){
  res.send('hello');
})

app.get('/todos', function(req, res) {
  knex.select().from('todos').where({id: 1})
    .then(todos=>{res.send(todos)});
})


app.post('/todos', function(req, res) {
  knex('todos').insert({title: 'hi', user_id: 1})
 /* knex.raw('insert into todos(title, user_id values(?, ?)',
    ['go to work', '1'])
   */
 .then(()=>{
      knex.select().from('todos')
        .then(todos=>{res.send(todos)});
    })

})


app.listen(port, ()=>{
  console.log('listening on port', port)
});
