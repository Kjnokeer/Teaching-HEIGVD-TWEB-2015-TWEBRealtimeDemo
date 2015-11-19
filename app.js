var express = require('express');
var app = express();
var http = require('http').Server(app);
var glob = require('glob');
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;


app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.use("/views/partials/:name", function (req, res) {
  res.render('partials/' + req.params.name);
});

app.get('/*', function(req, res) {
  res.render('index', {
    title: 'TWEB Realtime Demo'
  });
});

var votes = {};

function resetVotes() {
  votes = {
    'yes': 0,
    'no': 0,
    'iDontKnow': 0
  };
}

io.on('connection', function(socket) {
  resetVotes();
  io.emit('initVotes', votes);

  socket.on('yes', function() {
    votes.yes++;
    io.emit('updateVotes', votes);
  });

  socket.on('no', function() {
    votes.no++;
    io.emit('updateVotes', votes);
  });

  socket.on('iDontKnow', function() {
    votes.iDontKnow++;
    io.emit('updateVotes', votes);
  });

  socket.on('reset', function() {
    resetVotes();
    io.emit('updateVotes', votes);
  });
})

http.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
