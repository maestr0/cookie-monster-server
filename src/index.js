/* @flow */

require('dotenv').config();
import express from 'express'
import expressSetup  from './server/express.setup'
import slack from './slack'
import worker from './worker'
import logger from './logs'

const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);

slack();


var gpio = require('rpi-gpio');

gpio.on('change', function(channel, value) {
    logger.info('Channel ' + channel + ' value is now ' + value);
});
gpio.setup(23, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(24, gpio.DIR_IN, gpio.EDGE_BOTH);

module.exports = gpio

logger.info('CM started');
