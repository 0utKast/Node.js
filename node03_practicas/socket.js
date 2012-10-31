var repl = require("repl"), 
    net = require("net"); 
 
// start REPL with ignoreUndefined set to true

repl.start("node personalizado> ", null, null, null, true); 
 
net.createServer(function (socket) { 
  repl.start("node via TCP socket> ", socket); 
 
}).listen(8124); 