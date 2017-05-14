var api = require('../api/api')
var path = require('path')
var express = require('express')

var app = express()

// serve pure static assets
app.use('/static', express.static(path.join(__dirname,'../dist/static')));

var apiRoutes = express.Router()

app.get('/', (req, res) => {
    //console.log('index.html')
    res.sendFile(path.join(__dirname,'../dist/index.html'));
})

apiRoutes.get('/:id/todolist', (req, res) => {
  api.getToDo(req, res);
})

apiRoutes.get('/:id/toreadlist', (req, res) => {
  api.getToRead(req, res);
})
apiRoutes.get('/:id/toread/:uid/commit', (req, res) => {
  api.commitToRead(req, res);
})
apiRoutes.get('/:id/todo/:uid/save', (req, res) => {
  api.saveToDo(req, res);
})
apiRoutes.get('/:id/todo/:uid/:activetype/commit', (req, res) => {
  api.commitToDo(req, res);
})

app.use('/api',apiRoutes)

var uri = 'http://0.0.0.0:8080'

console.log('> Starting prd server...')

var server = app.listen('8080',function(){
    console.log(uri);
})
