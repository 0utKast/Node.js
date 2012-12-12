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
    if (data.text) { 
      var text = data.text.toLowerCase();
      if (text.indexOf('madrid') != -1) {
        madrid++
        total++
        if ((madrid % 75) == 0){
          io.sockets.volatile.emit('madridr', { 
            user: data.user.screen_name, 
            text: data.text,
            avatar: data.user.profile_image_url_https
          });
        }
      }
      if (text.indexOf('barcelona') != -1) {
        barcelona++
        total++
        if ((barcelona % 25) == 0){
          io.sockets.volatile.emit('barcelonar', { 
            user: data.user.screen_name, 
            text: data.text,
            avatar: data.user.profile_image_url_https
          });
        }
      }
      io.sockets.volatile.emit('percentages', { 
        madrid: (madrid/total)*100,
        barcelona: (barcelona/total)*100
      });
    }
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

