var gpio = require('rpi-gpio');

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});
gpio.setup(23, gpio.DIR_IN, gpio.EDGE_FALLING);
gpio.setup(24, gpio.DIR_IN, gpio.EDGE_FALLING);

module.exports = gpio
