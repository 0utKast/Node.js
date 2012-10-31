var sys = require("sys");

// ejemplo simple de timout - espera dos segundos antes de continuar al siguiente paso
var start_time = new Date();
sys.puts("Inicia un timer de 2 segundos");
setTimeout(function() {
  var end_time = new Date();
  var difference = end_time.getTime() - start_time.getTime();
  sys.puts("Detener el timer después de " + Math.round(difference/1000) + " segundos");
  cleartimeout_example();
}, 2000);

// clearTimeout example - timout set for 30secs, gets cancelled via clearTimeout right away, no output
function cleartimeout_example() {
  var start_time = new Date();
  sys.puts("\nStarting 30 second timer and stopping it immediately without triggering callback");
  var timeout = setTimeout(function() {
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Stopped timer after " + Math.round(difference/1000) + " seconds");
  }, 30000);
  clearTimeout(timeout);
  interval_example();
}

// interval example - 5x output every 2secs using setInterval
function interval_example() {
  var start_time = new Date();
  sys.puts("\nStarting 2 second interval, stopped after 5th tick");
  var count = 1;
  var interval = setInterval(function() {
    if (count == 5) clearInterval(this);
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Tick no. " + count + " after " + Math.round(difference/1000) + " seconds");
    count++;
  }, 2000);
}