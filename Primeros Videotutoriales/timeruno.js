var sys = require("sys");

// ejemplo simple de timeout - espera dos segundos antes de continuar al siguiente paso
var start_time = new Date();
sys.puts("Inicia un timer de 2 segundos");
setTimeout(function() {
  var end_time = new Date();
  var difference = end_time.getTime() - start_time.getTime();
  sys.puts("Detener el timer después de " + Math.round(difference/1000) + " segundos");
  cleartimeout_ejemplo();
}, 2000);

// ejemplo de clearTimeout  - timeout configurado en 30secs, se cancela de inmediato a través de clearTimeout, sin salida
function cleartimeout_ejemplo() {
  var start_time = new Date();
  sys.puts("\nSe inicia timer de 30 segundos y lo detiene inmediatamente sin disparar una llamada");
  var timeout = setTimeout(function() {
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Timer detenido después de " + Math.round(difference/1000) + " segundos");
  }, 30000);
  clearTimeout(timeout);
  interval_ejemplo();
}
// ejemplo intervalo - Cinco salidas cada 2 segundos usando setInterval
function interval_ejemplo() {
  var start_time = new Date();
  sys.puts("\nSe inicia un intervalo de 2 segundos, detenido después del quinto tick");
  var count = 1;
  var interval = setInterval(function() {
    if (count == 5) clearInterval(this);
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Tick número. " + count + " después de " + Math.round(difference/1000) + " segundos");
    count++;
  }, 2000);
}