#!/usr/bin/env node

var program = require('commander');
var coap = require('coap');

program
  .version('1.0.1')
  .usage('command [settings] hostname')
  .option('-s, --host <hostname>', 'coap server hostname', 'localhost')
  .option('-p, --port <port>', 'coap server port', 5683 )



program
  .command('led [color]')
  .description('set or get the led color')
  .action(function(color, options){
    var coapOptions = {
      hostname: program.host,
      port: program.port,
      method: 'POST',
      pathname: '/led'
    }

    if(typeof color === 'undefined') coapOptions.method = 'GET';

    var req = coap.request(coapOptions)
    if(coapOptions.method === 'GET'){
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
    var coapOptions = {
      hostname: program.host,
      port: program.port,
      method: 'GET',
      pathname: '/temperature'
    }
    var req = coap.request(coapOptions)
    req.on('response', function(res) {
      console.log("Temperature: %d°C", res.payload.toString());
    })
    req.end();
  });

program
  .command('beep <frequency>')
  .description('beep the mbed with a given frequency')
  .action(function(frequency, options){
    var coapOptions = {
      hostname: program.host,
      port: program.port,
      method: 'POST',
      pathname: '/beep'
    }
    var req = coap.request(coapOptions);
    req.end(frequency);
  });

program.parse(process.argv);
