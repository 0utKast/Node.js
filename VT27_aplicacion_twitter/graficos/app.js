var app = require('express').createServer(),
    twitter = require('ntwitter'),
    io = require('socket.io').listen(app),
    madrid = 0,
    barcelona = 0,
    total = 0;

app.listen(3000);

var twit = new twitter({
  consumer_key: 'EQEFL6cU8Qzmtugy4Qwzg',
  consumer_secret: '4exexzX58HgDX9jmNkBjUoCLeZC5hftiyR38x8T0w0',
  access_token_key: '995044219-DV0IaiDcGJYK2HVxHUxOUH5EKt3YzjV58f5xxhYo',
  access_token_secret: '6NDrBqn61aurepCvWQLwXqn1514Wrxl0uveZXUGmGI'
});


twit.stream('statuses/filter', { track: ['madrid', 'barcelona'] }, function(stream) {
  stream.on('data', function (data) {
    var text = data.text.toLowerCase();
    if (text.indexOf('madrid') !== -1) {
      madrid++
      total++
    }
    if (text.indexOf('barcelona') !== -1) {
      barcelona++
      total++
    }
    io.sockets.volatile.emit('tweet', { 
      user: data.user.screen_name, 
      text: data.text,
      madrid: (madrid/total)*100,
      barcelona: (barcelona/total)*100
    });
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

