
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');
 
 mongoose.connect('mongodb://localhost/desarrollo_tareas')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function validatePresenceOf(value) {
  return value && value.length;
}

var Tarea = new Schema({
  tarea : { type: String, validate: [validatePresenceOf, 'una tarea es obligatoria'] }
});

var Tarea = mongoose.model('Tarea', Tarea);


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/tareas', function(req, res){
  Tarea.find({}, function (err, docs) {
    res.render('tareas/index', {
      title: 'Vista index lista de tareas',
      docs: docs
    });
  });
});
app.get('/tareas/nueva', function(req, res){
  res.render('tareas/nueva.jade', {
    title: 'Nueva Tarea'
  });
});

app.post('/tareas', function(req, res){
  var tarea = new Tarea(req.body.tarea);
  tarea.save(function (err) {
    if (!err) {
      res.redirect('/tareas');
    }
    else {
      res.redirect('/tareas/nueva');
    }
  });
});

app.get('/tareas/:id/editar', function(req, res){
  Tarea.findById(req.params.id, function (err, doc){
    res.render('tareas/editar', {
      title: 'Vista Editar Tarea',
      tarea: doc
    });
  });
});

app.put('/tareas/:id', function(req, res){
  Tarea.findById(req.params.id, function (err, doc){
    doc.tarea = req.body.tarea.tarea;
    doc.save(function(err) {
      if (!err){
        res.redirect('/tareas');
      }
      else {
        // error handling
      }
    });
  });
});

app.del('/tareas/:id', function(req, res){
  Tarea.findById(req.params.id, function (err, doc){
    if (!doc) return next(new NotFound('Documento no encontrado'));
    doc.remove(function() {
      res.redirect('/tareas');
    });
  });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


