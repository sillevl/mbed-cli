// #!/usr/bin/env node

var program = require('commander');
var coap = require('coap');

program
  .version('0.0.1')
  .option('-s, --host', 'hostname for the mbed')
  .option('-p, --port', 'hostname for the mbed')

program
  .command('led [color]')
  .description('set or get the led color')
  .action(function(color, options){
    var options = {
      hostname: '192.168.1.29',
      method: 'POST',
      pathname: '/led'
    }

    if(typeof color === 'undefined') options.method = 'GET';

    var req = coap.request(options)
    if(options.method === 'GET'){
      req.on('response', function(res) {
        console.log("Led color: %s", res.payload.toString());
      })
    }
    req.end(color);
  });

program
  .command('temperature')
  .description('get the temperature')
  .action(function(options){
    var options = {
      hostname: '192.168.1.29',
      method: 'GET',
      pathname: '/temperature'
    }
    var req = coap.request(options)
    req.on('response', function(res) {
      console.log("Temperature: %d°C", res.payload.toString());
    })
    req.end();
  });

program
  .command('beep <frequency>')
  .description('beep the mbed with a given frequency')
  .action(function(frequency, options){
    var options = {
      hostname: '192.168.1.29',
      method: 'POST',
      pathname: '/beep'
    }
    var req = coap.request(options);
    req.end(frequency);
  });

program.parse(process.argv);
